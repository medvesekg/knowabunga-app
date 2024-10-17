import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  CustomError,
  getDynamoDbClient,
} from "../utils";
import { getScheduleItem } from "../../../data/api";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);
    const talkId = event.pathParameters?.talkId;

    if (!talkId) {
      throw new CustomError("Talk id missing", 400);
    }

    const talk = getScheduleItem(talkId);

    if (!talk || talk.type !== "talk") {
      throw new CustomError("Can't find talk with this id", 400);
    }

    if (
      !user.is_admin &&
      !talk?.speakers?.map((speaker) => speaker.email).includes(user.email)
    ) {
      throw new CustomError(
        "You can only view feedback for your own talk",
        400
      );
    }

    const dynamodb = getDynamoDbClient();
    let dynamoResponse = await dynamodb.send(
      new QueryCommand({
        TableName: process.env.FEEDBACK_TABLE,
        KeyConditionExpression: "talk_id = :talk_id",
        ExpressionAttributeValues: {
          ":talk_id": talkId,
        },
      })
    );
    return { body: JSON.stringify(dynamoResponse.Items) };
  }
);
