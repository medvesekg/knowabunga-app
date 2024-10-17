import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  CustomError,
  getDynamoDbClient,
} from "../utils";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);
    const dynamodb = getDynamoDbClient();

    if (!user.is_admin) {
      throw new CustomError("Unauthorized", 401);
    }

    let lastEvaluatedKey = null;
    let items: unknown[] = [];
    do {
      let dynamodbResponse = await dynamodb.send(
        new ScanCommand({
          TableName: process.env.USERS_TABLE,
        })
      );
      items = items.concat(dynamodbResponse.Items);
      lastEvaluatedKey = dynamodbResponse.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  }
);
