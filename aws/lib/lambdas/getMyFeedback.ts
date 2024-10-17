import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  getDynamoDbClient,
} from "../utils";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);
    const dynamodb = getDynamoDbClient();

    let dynamodbResponse = await dynamodb.send(
      new QueryCommand({
        TableName: process.env.FEEDBACK_TABLE,
        IndexName: "user-id-index",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
          ":user_id": user.user_id,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(dynamodbResponse.Items),
    };
  }
);
