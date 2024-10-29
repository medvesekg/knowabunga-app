import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { OAuth2Client } from "google-auth-library";
import {
  createHandlerFunction,
  generateRandomString,
  generateSessionId,
  getRandomArrayItem,
} from "../utils";
import { getAllScheduleItems, getRegions } from "../../../data/api";
import { isKeyOf } from "../../../lib/utils";
import { fetchLeetApiUserData } from "lib/utils/leetApi";

export const handler = createHandlerFunction(
  async (event: APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body || "");
    const credentials = body.credentials;

    let user: Record<string, any> = await loginUser(credentials);

    const dynamodb = new DynamoDB({});

    const dynamodbResponse = await dynamodb.send(
      new UpdateCommand({
        TableName: process.env.USERS_TABLE,
        Key: {
          user_id: user.user_id,
        },
        UpdateExpression: `
          SET  
            email = :email,
            #name  = :name,
            picture = :picture,
            is_admin = if_not_exists(is_admin, :is_admin),
            is_super_admin = if_not_exists(is_super_admin, :is_super_admin),
            region_id = if_not_exists(region_id, :region_id)
        `,
        ExpressionAttributeValues: {
          ":email": user.email,
          ":name": user.name,
          ":picture": user.picture || "",
          ":is_admin": user.is_admin,
          ":is_super_admin": user.is_super_admin,
          ":region_id": user.region_id,
        },
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ReturnValues: "ALL_NEW",
      })
    );

    user = dynamodbResponse.Attributes || user;

    const sessionId = await generateSessionId();
    const sessionExpiresAt = Date.now() + 604800000;
    await dynamodb.send(
      new PutCommand({
        TableName: process.env.SESSIONS_TABLE,
        Item: {
          session_id: sessionId,
          user_id: user.user_id,
          expires_at: sessionExpiresAt,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Logged in",
        session: { id: sessionId, expires_at: sessionExpiresAt },
        user: {
          email: user?.email,
          name: user?.name,
          picture: user?.picture,
          region_id: user?.region_id,
          is_admin: user?.is_admin,
          is_super_admin: user?.is_super_admin,
        },
      }),
    };
  }
);

async function loginUser(credentials: string) {
  return getTestingUser(credentials) || (await getGoogleUser(credentials));
}

async function getGoogleUser(credentials: string) {
  const oauthClient = new OAuth2Client();
  const ticket = await oauthClient.verifyIdToken({
    idToken: credentials,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  if (!payload || !payload.email || payload.hd !== "tretton37.com") {
    throw new Error("Unauthorized");
  }

  return {
    user_id: payload?.sub,
    email: payload?.email,
    name: payload?.name,
    picture: payload?.picture || "",
    is_admin: false,
    is_super_admin: false,
    region_id: await getUserRegion(payload.email),
  };
}

function getTestingUser(credentials: string) {
  if (process.env.ENV_NAME === "dev") {
    switch (credentials) {
      case "admin":
        return {
          user_id: generateRandomString(20),
          email: `${generateRandomString(6)}@${generateRandomString(6)}.com`,
          name: generateRandomString(12),
          picture: "",
          is_admin: true,
          is_super_admin: false,
          region_id: getRandomRegion(),
        };
      case "speaker":
        const talk = getRandomTalk();
        const speaker = talk.speakers[0];
        return {
          user_id: generateRandomString(20),
          email: speaker.email,
          name: generateRandomString(12),
          picture: "",
          is_admin: false,
          is_super_admin: false,
          region_id: talk.region_id,
        };
      case "attendee":
        return {
          user_id: generateRandomString(20),
          email: `${generateRandomString(6)}@${generateRandomString(6)}.com`,
          name: generateRandomString(12),
          picture: "",
          is_admin: false,
          is_super_admin: false,
          region_id: getRandomRegion(),
        };
    }
  }
  return null;
}

function getRandomRegion() {
  return getRandomArrayItem(getRegions().map((region) => region.id));
}

function getRandomTalk() {
  const talks = getAllScheduleItems().filter((item) => item.type === "talk");
  return getRandomArrayItem(talks);
}

async function getUserRegion(email: string) {
  const officeRegionMap = {
    ljubljana: "lj",
    lund: "or",
    stockholm: "st",
    borlänge: "bo",
    helsingborg: "or",
  };

  let leetApiUserData = await fetchLeetApiUserData(process.env.LEET_API_TOKEN);
  let leetApiUser = leetApiUserData?.find((user) => user.email === email);
  let office = leetApiUser?.office?.toLowerCase();

  return isKeyOf(office, officeRegionMap) ? officeRegionMap[office] : "";
}
