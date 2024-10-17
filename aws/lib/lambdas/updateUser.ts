import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  CustomError,
  getDynamoDbClient,
} from "../utils";
import { UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body || "");
    const userId = event.pathParameters?.userId;

    if (!userId) {
      throw new CustomError("User ID missing", 400);
    }

    const user = await authenticate(event);

    if (!user.is_admin) {
      throw new CustomError("Unauthorized", 403);
    }

    const dynamodb = getDynamoDbClient();

    const updateRequest = {
      TableName: process.env.USERS_TABLE,
      Key: {
        user_id: userId,
      },
      UpdateExpression: `SET`,
      ExpressionAttributeValues: {} as Record<string, unknown>,
      ExpressionAttributeNames: {} as Record<string, string>,
      ReturnValues: "ALL_NEW",
    } satisfies UpdateCommandInput;

    if (body.is_admin !== undefined && user.is_super_admin) {
      updateRequest.UpdateExpression += " #is_admin = :is_admin";
      updateRequest.ExpressionAttributeValues[":is_admin"] = body.is_admin;
      updateRequest.ExpressionAttributeNames["#is_admin"] = "is_admin";
    }

    if (body.region_id) {
      updateRequest.UpdateExpression += " #region_id = :region_id";
      updateRequest.ExpressionAttributeValues[":region_id"] = body.region_id;
      updateRequest.ExpressionAttributeNames["#region_id"] = "region_id";
    }

    const dynamodbResponse = await dynamodb.send(
      new UpdateCommand(updateRequest)
    );

    return {
      statusCode: 200,
      body: JSON.stringify(dynamodbResponse),
    };
  }
);
