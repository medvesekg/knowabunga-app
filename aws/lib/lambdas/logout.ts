import { APIGatewayProxyEvent } from "aws-lambda";
import {
  createHandlerFunction,
  getDynamoDbClient,
  getSessionId,
} from "../utils";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const sessionId = getSessionId(event);
    const dynamodb = getDynamoDbClient();

    await dynamodb.send(
      new DeleteCommand({
        TableName: process.env.SESSIONS_TABLE,
        Key: {
          session_id: sessionId,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logged out" }),
    };
  }
);
