import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  listenerMidleware as authListenerMiddleware,
} from "./authSlice";
import feedbackReducer, {
  listenerMidleware as feedbackListenerMidleware,
} from "./feedbackSlice";
import titleReducer from "./titleSlice";
import themeReducer, {
  listenerMidleware as themeListenerMiddleware,
} from "./themeSlice";
import notificationsReducer, {
  listenerMidleware as notificationsListenerMiddleware,
} from "./notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    title: titleReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authListenerMiddleware.middleware)
      .prepend(themeListenerMiddleware.middleware)
      .prepend(notificationsListenerMiddleware.middleware)
      .prepend(feedbackListenerMidleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
