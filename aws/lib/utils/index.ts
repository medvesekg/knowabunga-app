import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { randomBytes } from "crypto";

// Adds CORS headers to a response object
export function addCorsHeaders(responseObject: { [key: string]: any }) {
  return {
    ...responseObject,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "*",
    },
  };
}

export function generateSessionId() {
  return new Promise((resolve, reject) => {
    randomBytes(48, (err, buf) => {
      if (err) {
        return reject(err);
      }
      return resolve(buf.toString("hex"));
    });
  });
}

type HandlerFunction = (
  event: APIGatewayProxyEvent
) => Promise<{ [key: string]: any }>;

// Wrapper for creating the lambda handler. Handles error responses and CORS headers.
export function createHandlerFunction(handler: HandlerFunction) {
  return async function (event: APIGatewayProxyEvent) {
    try {
      let response = await handler(event);
      return addCorsHeaders(response);
    } catch (e) {
      console.log(e);
      if (e instanceof CustomError) {
        return addCorsHeaders({
          statusCode: e.statusCode,
          body: JSON.stringify({ message: e.message }),
        });
      }
      return addCorsHeaders({
        statusCode: 500,
        body: JSON.stringify({ message: "Server error" }),
      });
    }
  };
}

// Custom error - the message and status code will be returned in the API response (if using createHandlerFunction)
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Get the current user from provided session id in the request. Throws error if unauthenticated.
export async function authenticate(event: {
  headers: { Authorization?: string };
}) {
  const sessionId = getSessionId(event);
  if (!sessionId) {
    throw new UnauthenticatedError();
  }

  const dynamodb = getDynamoDbClient();

  const dynamoResponse = await dynamodb.send(
    new GetCommand({
      TableName: process.env.SESSIONS_TABLE,
      Key: {
        session_id: sessionId,
      },
    })
  );
  const session = dynamoResponse.Item;

  if (!session || session.expires_at < Date.now()) {
    throw new UnauthenticatedError();
  }

  const user = (
    await dynamodb.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: {
          user_id: session.user_id,
        },
      })
    )
  )?.Item;

  if (!user) {
    throw new UnauthenticatedError();
  }

  return user;
}

export class UnauthenticatedError extends CustomError {
  constructor() {
    super("Unauthenticated", 401);
  }
}

export function getDynamoDbClient() {
  const client = new DynamoDBClient({});
  return DynamoDBDocumentClient.from(client);
}

export function getSessionId(event: { headers: { Authorization?: string } }) {
  return event.headers["Authorization"]?.slice(7);
}

export function generateRandomString(length: number) {
  return randomBytes(length).toString("hex");
}

export function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArrayItem<T extends any[]>(array: T) {
  return array[generateRandomInt(0, array.length - 1)];
}
