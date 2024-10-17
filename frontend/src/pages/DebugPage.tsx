import { useEffect, useState } from "react";

export function DebugPage() {
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

  const [pushSubscriptionStatus, setPushSubscriptionStatus] = useState("");

  useEffect(() => {
    refreshIsServiceWorkerReady();
  }, []);

  function isServiceWorkerAvailable() {
    return "serviceWorker" in navigator;
  }

  function refreshIsServiceWorkerReady() {
    navigator.serviceWorker.ready.then(() => {
      setIsServiceWorkerReady(true);
    });
  }

  function subscribeToPushNotifications() {
    return navigator.serviceWorker.ready.then(async (registration) => {
      return registration.pushManager
        .subscribe({
          userVisibleOnly: true, // Ensures that the push can only be shown as a notification,
          applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY,
        })
        .then(() => {
          setPushSubscriptionStatus("true");
        })
        .catch(setPushSubscriptionStatus);
    });
  }

  return (
    <div className="text-black">
      <div>
        Service worker available:{" "}
        {isServiceWorkerAvailable() ? "true" : "false"}
      </div>
      <div onClick={refreshIsServiceWorkerReady}>
        Service worker ready? {isServiceWorkerReady ? "true" : "false"}
      </div>
      <div onClick={subscribeToPushNotifications}>
        Push subscription? {pushSubscriptionStatus}
      </div>
    </div>
  );
}
