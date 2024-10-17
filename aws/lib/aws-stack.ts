import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Rule, RuleTargetInput, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { getAllScheduleItems } from "../../data/api";

interface StackProps extends cdk.StackProps {
  envName: "dev" | "prod";
}

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 1. Create our DynamoDB table
    const feedbackTable = new Table(this, "FeedbackTable", {
      partitionKey: { name: "talk_id", type: AttributeType.STRING },
      sortKey: { name: "user_id", type: AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    feedbackTable.addGlobalSecondaryIndex({
      indexName: "user-id-index",
      partitionKey: { name: "user_id", type: AttributeType.STRING },
    });

    const usersTable = new Table(this, "UsersTable", {
      partitionKey: { name: "user_id", type: AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const sessionsTable = new Table(this, "SessionsTable", {
      partitionKey: { name: "session_id", type: AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const notificationSubscriptionsTable = new Table(
      this,
      "NotificationSubscriptionsTable",
      {
        partitionKey: { name: "user_id", type: AttributeType.STRING },
        sortKey: { name: "subscription_id", type: AttributeType.STRING },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        billingMode: BillingMode.PAY_PER_REQUEST,
      }
    );

    notificationSubscriptionsTable.addGlobalSecondaryIndex({
      indexName: "region-id-index",
      partitionKey: { name: "region_id", type: AttributeType.STRING },
    });

    // Create REST API
    const api = new RestApi(this, `${id}-Api`, {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    // Create Lambda functions
    const getTalkFeedbackLambda = new NodejsFunction(
      this,
      "GetTalkFeedbackLambda",
      {
        entry: "lib/lambdas/getTalkFeedback.ts",
        handler: "handler",
        environment: {
          FEEDBACK_TABLE: feedbackTable.tableName,
          USERS_TABLE: usersTable.tableName,
          SESSIONS_TABLE: sessionsTable.tableName,
        },
      }
    );

    const getMyFeedbackLambda = new NodejsFunction(
      this,
      "GetMyFeedbackLambda",
      {
        entry: "lib/lambdas/getMyFeedback.ts",
        handler: "handler",
        environment: {
          FEEDBACK_TABLE: feedbackTable.tableName,
          USERS_TABLE: usersTable.tableName,
          SESSIONS_TABLE: sessionsTable.tableName,
        },
      }
    );

    const postTalkFeedbackLambda = new NodejsFunction(
      this,
      "PostTalkFeedbackLambda",
      {
        entry: "lib/lambdas/postTalkFeedback.ts",
        handler: "handler",
        environment: {
          FEEDBACK_TABLE: feedbackTable.tableName,
          USERS_TABLE: usersTable.tableName,
          SESSIONS_TABLE: sessionsTable.tableName,
          ENV_NAME: props?.envName || "",
        },
      }
    );

    const googleLoginLambda = new NodejsFunction(this, "GoogleLoginLambda", {
      entry: "lib/lambdas/googleLogin.ts",
      handler: "handler",
      environment: {
        USERS_TABLE: usersTable.tableName,
        SESSIONS_TABLE: sessionsTable.tableName,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
        LEET_API_TOKEN: process.env.LEET_API_TOKEN || "",
        ENV_NAME: props?.envName || "",
      },
      timeout: cdk.Duration.seconds(5),
    });

    const logoutLambda = new NodejsFunction(this, "LogoutLambda", {
      entry: "lib/lambdas/logout.ts",
      handler: "handler",
      environment: {
        USERS_TABLE: usersTable.tableName,
        SESSIONS_TABLE: sessionsTable.tableName,
      },
    });

    const subscribeToPushNotificationsLambda = new NodejsFunction(
      this,
      "SubscribeToPushNotificationsLambda",
      {
        entry: "lib/lambdas/subscribeToPushNotifications.ts",
        handler: "handler",
        environment: {
          USERS_TABLE: usersTable.tableName,
          SESSIONS_TABLE: sessionsTable.tableName,
          NOTIFICATION_SUBSCRIPTIONS_TABLE:
            notificationSubscriptionsTable.tableName,
        },
      }
    );

    const sendTestPushNotificationLambda = new NodejsFunction(
      this,
      "SendTestPushNotificationLambda",
      {
        entry: "lib/lambdas/sendTestPushNotification.ts",
        handler: "handler",
        environment: {
          USERS_TABLE: usersTable.tableName,
          SESSIONS_TABLE: sessionsTable.tableName,
          NOTIFICATION_SUBSCRIPTIONS_TABLE:
            notificationSubscriptionsTable.tableName,
          PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY || "",
          PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY || "",
        },
      }
    );

    const sendPushNotificationsLambda = new NodejsFunction(
      this,
      "SendPushNotificationsLambda",
      {
        entry: "lib/lambdas/sendPushNotifications.ts",
        handler: "handler",
        environment: {
          NOTIFICATION_SUBSCRIPTIONS_TABLE:
            notificationSubscriptionsTable.tableName,
          PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY || "",
          PRIVATE_VAPID_KEY: process.env.PRIVATE_VAPID_KEY || "",
        },
      }
    );

    const getAllUsersLambda = new NodejsFunction(this, "GetAllUsersLambda", {
      entry: "lib/lambdas/getAllUsers.ts",
      handler: "handler",
      environment: {
        USERS_TABLE: usersTable.tableName,
        SESSIONS_TABLE: sessionsTable.tableName,
      },
    });

    const updateUserLambda = new NodejsFunction(this, "UpdateUserLambda", {
      entry: "lib/lambdas/updateUser.ts",
      handler: "handler",
      environment: {
        USERS_TABLE: usersTable.tableName,
        SESSIONS_TABLE: sessionsTable.tableName,
      },
    });

    // Grant permissions to lambdas
    feedbackTable.grantReadData(getTalkFeedbackLambda);
    usersTable.grantReadData(getTalkFeedbackLambda);
    sessionsTable.grantReadData(getTalkFeedbackLambda);

    feedbackTable.grantReadData(getMyFeedbackLambda);
    usersTable.grantReadData(getMyFeedbackLambda);
    sessionsTable.grantReadData(getMyFeedbackLambda);

    usersTable.grantReadWriteData(googleLoginLambda);
    sessionsTable.grantReadWriteData(googleLoginLambda);

    feedbackTable.grantReadWriteData(postTalkFeedbackLambda);
    usersTable.grantReadData(postTalkFeedbackLambda);
    sessionsTable.grantReadData(postTalkFeedbackLambda);

    usersTable.grantReadData(logoutLambda);
    sessionsTable.grantReadWriteData(logoutLambda);

    usersTable.grantReadData(subscribeToPushNotificationsLambda);
    sessionsTable.grantReadData(subscribeToPushNotificationsLambda);
    notificationSubscriptionsTable.grantReadWriteData(
      subscribeToPushNotificationsLambda
    );

    usersTable.grantReadData(sendTestPushNotificationLambda);
    sessionsTable.grantReadData(sendTestPushNotificationLambda);
    notificationSubscriptionsTable.grantReadData(
      sendTestPushNotificationLambda
    );

    notificationSubscriptionsTable.grantReadWriteData(
      sendPushNotificationsLambda
    );

    sessionsTable.grantReadData(getAllUsersLambda);
    usersTable.grantReadData(getAllUsersLambda);

    sessionsTable.grantReadData(updateUserLambda);
    usersTable.grantReadWriteData(updateUserLambda);

    // Create API gateway integrations
    const getTalkFeedbackIntergration = new LambdaIntegration(
      getTalkFeedbackLambda
    );
    const postTalkFeedbackIntegration = new LambdaIntegration(
      postTalkFeedbackLambda
    );
    const getMyFeedbackIntegration = new LambdaIntegration(getMyFeedbackLambda);
    const googleLoginIntergation = new LambdaIntegration(googleLoginLambda);
    const logoutIntegration = new LambdaIntegration(logoutLambda);
    const subscribeToPushNotificationsIntegration = new LambdaIntegration(
      subscribeToPushNotificationsLambda
    );
    const sendTestPushNotificationIntegration = new LambdaIntegration(
      sendTestPushNotificationLambda
    );

    const getAllUsersIntegration = new LambdaIntegration(getAllUsersLambda);
    const updateUserIntegration = new LambdaIntegration(updateUserLambda);

    // Create API resources
    const loginApiResource = api.root.addResource("login");
    const logoutApiResource = api.root.addResource("logout");
    const talkApiResource = api.root.addResource("talks");
    const talkIdApiResource = talkApiResource.addResource("{talkId}");
    const talkFeedbackApiResource = talkIdApiResource.addResource("feedback");
    const myFeedbackApiResource = api.root.addResource("my-feedback");
    const subscriptionsApiResource = api.root.addResource("subscriptions");
    const testNotificationApiResource =
      subscriptionsApiResource.addResource("test");

    const usersResource = api.root.addResource("users");
    const userResouce = usersResource.addResource("{userId}");

    // Add methods to api resource and connect them with integartions
    talkFeedbackApiResource.addMethod("GET", getTalkFeedbackIntergration);
    talkFeedbackApiResource.addMethod("POST", postTalkFeedbackIntegration);
    myFeedbackApiResource.addMethod("GET", getMyFeedbackIntegration);
    loginApiResource.addMethod("POST", googleLoginIntergation);
    logoutApiResource.addMethod("POST", logoutIntegration);
    subscriptionsApiResource.addMethod(
      "POST",
      subscribeToPushNotificationsIntegration
    );
    testNotificationApiResource.addMethod(
      "POST",
      sendTestPushNotificationIntegration
    );

    usersResource.addMethod("GET", getAllUsersIntegration);
    userResouce.addMethod("PATCH", updateUserIntegration);

    getAllScheduleItems()
      .filter((item) => item.type === "talk")
      .forEach((talk) => {
        const to = new Date(talk.to);
        const minutes = to.getMinutes();
        const hours = to.getUTCHours();
        const dayOfMonth = to.getUTCDate();
        const month = to.getUTCMonth() + 1;
        const year = to.getUTCFullYear();

        const cron = `cron(${minutes} ${hours} ${dayOfMonth} ${month} ? ${year})`;

        const ruleName = `${id}-Notification-${talk.id}`;

        const rule = new Rule(this, ruleName, {
          schedule: Schedule.expression(cron),
          ruleName: ruleName,
        });

        rule.addTarget(
          new LambdaFunction(sendPushNotificationsLambda, {
            event: RuleTargetInput.fromObject({
              talk_id: talk.id,
              rule_name: ruleName,
            }),
          })
        );
      });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "The URL of the API Gateway",
    });
  }
}
