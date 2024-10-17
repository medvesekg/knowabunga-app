import axios, { AxiosError } from "axios";
import store from "@/store/store";
import toast from "react-hot-toast";
import { Feedback } from "#/data/types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function makeApiRequest(
  method: string,
  uri: string,
  data: unknown = undefined
) {
  const sessionId = store.getState().auth.session?.id;

  return axios
    .request({
      method: method,
      url: baseUrl + uri,
      data,
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    })
    .then((response) => response.data);
}

export async function getFeedbackForTalk(talkId: string) {
  return makeApiRequest("GET", `/talks/${talkId}/feedback`);
}

export async function postFeedbackForTalk(talkId: string, feedback: Feedback) {
  return makeApiRequest("POST", `talks/${talkId}/feedback`, feedback);
}

export async function getMyFeedback() {
  return makeApiRequest("GET", "my-feedback");
}

export async function loginWithGoogleCredentials(credentials: string) {
  return axios.post(baseUrl + "login", { credentials });
}

export async function logout() {
  return makeApiRequest("POST", "logout");
}

export async function sendNotificationSubscriptionToBackend(
  subscriptionObject: PushSubscription
) {
  return await makeApiRequest("POST", "subscriptions", {
    subscription: subscriptionObject,
  });
}

export async function sendTestNotification() {
  return await makeApiRequest("POST", "subscriptions/test");
}

export function apiErrorHandler(e: AxiosError<{ message: string }>) {
  toast.error(e?.response?.data?.message || "Server error");
}

export async function getAllUsers() {
  return makeApiRequest("GET", "/users");
}
