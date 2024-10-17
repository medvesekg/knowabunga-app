import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  getDynamoDbClient,
} from "../utils";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);

    const body = JSON.parse(event.body || "");

    const dynamodb = getDynamoDbClient();

    await dynamodb.send(
      new PutCommand({
        TableName: process.env.NOTIFICATION_SUBSCRIPTIONS_TABLE,
        Item: {
          user_id: user.user_id,
          subscription_id: body.subscription.endpoint,
          subscription: body.subscription,
          region_id: user.region_id,
          user_name: user.name,
          user_email: user.email,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscribed to push notifications" }),
    };
  }
);
