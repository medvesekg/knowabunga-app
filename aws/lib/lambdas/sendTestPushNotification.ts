import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  getDynamoDbClient,
} from "../utils";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import * as webPush from "web-push";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);

    const dynamodb = getDynamoDbClient();
    let dynamoResponse = await dynamodb.send(
      new QueryCommand({
        TableName: process.env.NOTIFICATION_SUBSCRIPTIONS_TABLE,
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
          ":user_id": user.user_id,
        },
      })
    );

    const items = dynamoResponse.Items || [];
    webPush.setVapidDetails(
      "mailto:your_email@example.com",
      process.env.PUBLIC_VAPID_KEY || "",
      process.env.PRIVATE_VAPID_KEY || ""
    );

    const payload = JSON.stringify({
      title: "Test notification",
      body: "If you got this notification then notifications are working!",
    });

    await Promise.all(
      items.map((item) => {
        return webPush
          .sendNotification(item.subscription, payload)
          .then((response) => console.log("Sent notification", response))
          .catch((error) => console.error("Error sending notification", error));
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notification sent" }),
    };
  }
);
