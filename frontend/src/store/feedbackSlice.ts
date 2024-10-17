import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { isPlainObject, merge } from "lodash-es";
import { RootState } from "./store";

const LOCAL_STORAGE_KEY = "feedback";

function getInitialState() {
  let saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  saved = isPlainObject(saved) ? saved : {};
  return merge({}, getDefaultState(), saved);
}
function getDefaultState() {
  return {
    feedback: {},
  };
}

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: getInitialState(),
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    addFeedback: (state, action) => {
      state.feedback[action.payload.talkId] = {
        content: action.payload.feedback,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFeedback, addFeedback } = feedbackSlice.actions;

export const listenerMidleware = createListenerMiddleware();

const startListening = listenerMidleware.startListening.withTypes<RootState>();

startListening({
  actionCreator: setFeedback,
  effect: (_, listenerApi) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(listenerApi.getState().feedback)
    );
    listenerApi.cancelActiveListeners();
  },
});

startListening({
  actionCreator: addFeedback,
  effect: (_, listenerApi) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(listenerApi.getState().feedback)
    );
    listenerApi.cancelActiveListeners();
  },
});

export default feedbackSlice.reducer;
