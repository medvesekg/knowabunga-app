import {
  areNotificationsAvailable,
  areNotificationsEnabled,
  askToEnableNotifications,
  subscribeToPushNotifications,
} from "@/utils";
import { useRerender } from "@/utils/hooks";

export default function NotificationsToggle() {
  return (
    <div>
      <span
        className="mr-1"
        title="Be notified when a talk is completed and open for feedback"
      >
        Notifications:{" "}
      </span>
      <span>
        <Label />
      </span>
    </div>
  );
}

function Label() {
  const rerender = useRerender();

  function enableNotifications() {
    askToEnableNotifications()
      .then(rerender)
      .then(subscribeToPushNotifications);
  }

  if (!areNotificationsAvailable()) {
    return (
      <span
        className="text-text-secondary cursor-not-allowed"
        title="Notifications are not supported by your browser"
      >
        unavailable
      </span>
    );
  }

  if (areNotificationsEnabled()) {
    return (
      <span
        className="text-text-primary"
        title="To disable notifications you need to revoke notification permissions in your browser"
      >
        enabled
      </span>
    );
  }

  return (
    <span
      className="text-text-secondary cursor-pointer"
      title="Click to enable notifications"
      onClick={enableNotifications}
    >
      disabled
    </span>
  );
}
