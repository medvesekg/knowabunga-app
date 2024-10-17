import { authenticate, getSessionId } from "../lib/utils";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

jest.mock("@aws-sdk/lib-dynamodb");

test("Session id is extracted", () => {
  const event = {
    headers: {
      Authorization: "Bearer 12345678",
    },
  };

  const result = getSessionId(event);
  expect(result).toBe("12345678");
});

test("Authenticate", async () => {
  (DynamoDBDocumentClient.from as jest.Mock).mockReturnValueOnce({
    send: async () => ({
      Item: {},
    }),
  });
  let result = authenticate({
    headers: { Authorization: "Bearer 12345678" },
  });
  console.log(await result);
});
