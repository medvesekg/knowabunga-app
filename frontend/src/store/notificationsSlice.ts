import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { isPlainObject, merge } from "lodash-es";
import { RootState } from "./store";

const localStoragKey = "notifications";

function getDefaultState() {
  return {
    alreadyAsked: false,
    dontBother: false,
    subscription: null,
  };
}

function getInitialState() {
  let saved = JSON.parse(localStorage.getItem(localStoragKey) || "{}");
  saved = isPlainObject(saved) ? saved : {};
  return merge({}, getDefaultState(), {
    dontBother: saved.dontBother || false,
    subscription: saved.subscription || null,
  });
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: getInitialState(),
  reducers: {
    setDontBother: (state, action) => {
      state.dontBother = action.payload;
    },

    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    setAlreadyAsked: (state, action) => {
      state.alreadyAsked = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDontBother, setSubscription, setAlreadyAsked } =
  notificationsSlice.actions;

export const listenerMidleware = createListenerMiddleware();

const startListening = listenerMidleware.startListening.withTypes<RootState>();

startListening({
  actionCreator: setDontBother,
  effect: (_, listenerApi) => {
    localStorage.setItem(
      localStoragKey,
      JSON.stringify(listenerApi.getState().notifications)
    );
    listenerApi.cancelActiveListeners();
  },
});
startListening({
  actionCreator: setSubscription,
  effect: (_, listenerApi) => {
    localStorage.setItem(
      localStoragKey,
      JSON.stringify(listenerApi.getState().notifications)
    );
    listenerApi.cancelActiveListeners();
  },
});

export default notificationsSlice.reducer;
