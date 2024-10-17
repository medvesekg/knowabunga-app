import { useEffect } from "react";
import toast from "react-hot-toast";
import NotificationPermissionsToast from "./NotificationPermissionsToast";
import { areNotificationsAvailable, areNotificationsEnabled } from "@/utils";
import store from "@/store/store";
import { setAlreadyAsked } from "@/store/notificationsSlice";

function shouldNagUserAboutEnablingNotifications() {
  const alreadyAsked = store.getState().notifications.alreadyAsked;
  const userDoesntWantToBeBothered = store.getState().notifications.dontBother;

  return (
    areNotificationsAvailable() &&
    !areNotificationsEnabled() &&
    !alreadyAsked &&
    !userDoesntWantToBeBothered
  );
}

function showNotificationPermissionsToast() {
  store.dispatch(setAlreadyAsked(true));
  return toast((t) => <NotificationPermissionsToast toastId={t.id} />, {
    duration: 10000,
  });
}

export default function NotificationPermissionsNagger() {
  useEffect(() => {
    if (shouldNagUserAboutEnablingNotifications()) {
      const timeout = setTimeout(showNotificationPermissionsToast);
      return () => {
        clearInterval(timeout);
      };
    }
  }, []);

  return null;
}
