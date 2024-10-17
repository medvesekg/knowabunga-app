import { getDynamoDbClient } from "../utils";
import { DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getScheduleItem } from "../../../data/api";
import * as webPush from "web-push";

interface CustomEvent {
  talk_id: string;
}

export const handler = async (event: CustomEvent) => {
  const dynamodb = getDynamoDbClient();
  const talkId = event.talk_id;
  const talk = getScheduleItem(talkId);

  if (!talk) {
    throw new Error(`Talk with id ${talkId} does not exist`);
  }

  const dynamoResponse = await dynamodb.send(
    new QueryCommand({
      TableName: process.env.NOTIFICATION_SUBSCRIPTIONS_TABLE,
      IndexName: "region-id-index",
      KeyConditionExpression: "region_id = :region_id",
      ExpressionAttributeValues: {
        ":region_id": talk.region_id,
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
    title: "It is time to give your feedback",
    body: talk.title,
    url: `/talks/${talk.id}/give-feedback`,
  });

  await Promise.all(
    items.map((item) => {
      return webPush
        .sendNotification(item.subscription, payload)
        .then((response) => console.log("Sent notification", response))
        .catch((error) => {
          console.error("Error sending notification", error);
          dynamodb.send(
            new DeleteCommand({
              TableName: process.env.NOTIFICATION_SUBSCRIPTIONS_TABLE,
              Key: {
                user_id: item.user_id,
                subscription_id: item.subscription_id,
              },
            })
          );
        });
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Notification sent" }),
  };
};
