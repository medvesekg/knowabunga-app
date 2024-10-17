import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

self.addEventListener("push", function (event) {
  const data = event.data?.json();
  const options = {
    body: data.body,
    //icon: 'path_to_icon.png',  // Optional
    //badge: 'path_to_badge.png' // Optional
    data: {
      url: data.url,
    },
  };

  // Show the notification
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the notification

  // Open the URL specified in the notification data
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});
