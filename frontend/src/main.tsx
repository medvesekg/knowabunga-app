import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import {
  isDevelopment,
  setCurrentTimeAfterLastTalkIsFinished,
} from "./utils/index.ts";
import App from "./App.tsx";

if (isDevelopment()) {
  // The curernt time returned by Js Date object is
  // modified so you can test time locked features in
  // devleopment
  setCurrentTimeAfterLastTalkIsFinished();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
