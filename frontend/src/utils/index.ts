import { getAllScheduleItems } from "#/data/api";
import { sendNotificationSubscriptionToBackend } from "@/api";
import { max } from "lodash-es";
import FakeTime from "./fake-time";

// Wait for the specified amount of time
export function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

// Import helper to import all components from a certain directory
// Use like this:
// const components = globImportComponents(import.meta.glob("path/to/dir/*", {eager: true}))
// Since this is a compiler directive you cannot use variables as the "path" argument, only constant string literals.
// The function returns a map of found components, use like this:
// const DynamicComponent = components[name]
// <DynamicComponent />
export function globImportComponents(importMetaGlob: object) {
  return Object.fromEntries(
    Object.entries(importMetaGlob).map(([path, exports]) => {
      const pathParts = path.split("/");
      const fullFileName = pathParts[pathParts.length - 1];
      const fileNameParts = fullFileName.split(".");
      const componentName = fileNameParts[0];
      return [componentName, exports.default];
    })
  );
}

// This will output a typescript interface of the given object to the browser console.
// Use to quickly generate an interface for e.g. an api response.
export function generateInterface(
  object: { [key: string]: unknown },
  interfaceName: string
) {
  const typescriptCode = [`interface ${interfaceName} {`];
  for (const key in object) {
    typescriptCode.push(`${key}: ${typeof object[key]}`);
  }
  typescriptCode.push("}");
  console.log(typescriptCode.join("\n"));
}

// Get the value of a css variable
export function getCssVar(cssVar: string) {
  return getComputedStyle(document.body).getPropertyValue(cssVar);
}

// Get a formatted rgba() css property from a tailwind css color var
export function getRgbCssFromCssVar(cssVar: string) {
  const cssVarValue = getCssVar(cssVar);
  return `rgba(${cssVarValue.split(" ").join(",")})`;
}

export function setCssVar(cssVar: string, value: string) {
  document.documentElement.style.setProperty(cssVar, value);
}

export function areNotificationsAvailable() {
  return "Notification" in window;
}

export function areNotificationsEnabled() {
  return Notification.permission === "granted";
}

export function askToEnableNotifications() {
  return Notification.requestPermission();
}

export function subscribeToPushNotifications() {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.ready.then(async (registration) => {
      if (areNotificationsAvailable() && areNotificationsEnabled()) {
        return registration.pushManager
          .subscribe({
            userVisibleOnly: true, // Ensures that the push can only be shown as a notification,
            applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY,
          })
          .then(sendNotificationSubscriptionToBackend);
      }
    });
  }
}

export function isDevelopment() {
  return import.meta.env.VITE_ENV === "dev";
}

export function setCurrentTimeAfterLastTalkIsFinished() {
  const scheduleItems = getAllScheduleItems();
  const maxDate = max(scheduleItems.map((item) => item.to));
  if (maxDate) {
    FakeTime.set(new Date(maxDate));
  }
}
