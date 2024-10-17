import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { isPlainObject, merge } from "lodash-es";

const localStoragKey = "auth";

function getDefaultState() {
  return {
    session: null,
    user: null,
  };
}

function getInitialState() {
  let saved = JSON.parse(localStorage.getItem(localStoragKey) || "{}");
  saved = isPlainObject(saved) ? saved : {};
  return merge({}, getDefaultState(), saved);
}

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.
    saveAuthData: (state, action) => {
      state.session = action.payload.session;
      state.user = action.payload.user;
    },
    deleteAuthData: (state) => {
      state.session = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAuthData, deleteAuthData } = authSlice.actions;

export const listenerMidleware = createListenerMiddleware();
listenerMidleware.startListening({
  actionCreator: saveAuthData,
  effect: (action, listenerApi) => {
    localStorage.setItem(localStoragKey, JSON.stringify(action.payload));
    listenerApi.cancelActiveListeners();
  },
});

export default authSlice.reducer;
