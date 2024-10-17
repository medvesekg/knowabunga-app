import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import {
  authenticate,
  createHandlerFunction,
  CustomError,
  getDynamoDbClient,
} from "../utils";
import { getScheduleItem } from "../../../data/api";
import feedbackSchema, { feedbackTypes } from "../../../data/feedbackSchema";
import { z } from "zod";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const user = await authenticate(event);

    const dynamodb = getDynamoDbClient();

    const talkId = event.pathParameters?.talkId;

    if (!talkId) {
      throw new CustomError("Talk ID is missing", 400);
    }

    const body = event.body;

    const bodyParsed = JSON.parse(body || "");

    const talk = getScheduleItem(talkId);

    if (!talk || talk.type !== "talk") {
      throw new CustomError("Talk with this ID does not exists", 400);
    }
    if (talk?.speakers?.map((speaker) => speaker.email).includes(user.email)) {
      throw new CustomError("Can't rate own talk", 400);
    }
    if (talk?.region_id !== user.region_id) {
      throw new CustomError("Can only rate talks in home region", 400);
    }

    if (process.env.ENV_NAME !== "dev") {
      if (new Date(talk.to) > new Date()) {
        throw new CustomError("Talk is not yet open for feedback.", 400);
      }
    }

    const feedback = validate(bodyParsed);
    if (!feedback) {
      throw new CustomError("Validation error", 400);
    }

    await dynamodb.send(
      new PutCommand({
        TableName: process.env.FEEDBACK_TABLE,
        Item: {
          talk_title: talk.title,
          talk_id: talkId,
          user_id: user.user_id,
          content: feedback,
          user_name: user.name,
          user_email: user.email,
          user_picture: user.picture,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback submitted" }),
    };
  }
);

function validate(value: unknown) {
  const validationSchema = feedbackSchema.reduce(
    (validationSchema, schemaItem) => {
      validationSchema[schemaItem.id] =
        feedbackTypes[schemaItem.type].validation;
      return validationSchema;
    },
    {} as { [key: (typeof feedbackSchema)[number]["id"]]: z.ZodType }
  );

  const schema = z.object(validationSchema);
  const validation = schema.safeParse(value);
  return validation.data;
}
