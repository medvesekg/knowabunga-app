import { setCssVar } from "@/utils";
import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { isFunction, isPlainObject, merge } from "lodash-es";
import { RootState } from "./store";

const localStoragKey = "theme";

const themes = {
  light: {
    "--color-primary": "4 216 102",
    "--color-secondary": "29 46 140",
    "--color-text-primary": "0 0 0",
    "--color-background": "255 255 255",
    "--color-background-secondary": "216 216 216",
  },
  dark: {
    "--color-primary": "29 46 140",
    "--color-secondary": "4 216 102",
    "--color-text-primary": "226 227 222",
    "--color-background": "4 6 13",
    "--color-background-secondary": "76 76 76",
  },
  random: () => ({
    "--color-primary": randomColor(),
    "--color-secondary": randomColor(),
    "--color-text-primary": randomColor(),
    "--color-background": randomColor(),
    "--color-background-secondary": randomColor(),
  }),
};

export const availableThemes = ["dark", "light", "random"];

function getDefaultState() {
  return {
    current: "dark",
  };
}

function getInitialState() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(localStoragKey) || "{}");
  } catch {
    saved = {};
  }
  saved = isPlainObject(saved) ? saved : {};
  const state = merge({}, getDefaultState(), saved);

  updateCssVariables(state.current);

  return state;
}

export const authSlice = createSlice({
  name: "theme",
  initialState: getInitialState(),
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.
    toggleTheme: (state) => {
      state.current = state.current === "dark" ? "light" : "dark";
    },
    setTheme: (state, action) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme, setTheme } = authSlice.actions;

export const listenerMidleware = createListenerMiddleware();

const startListening = listenerMidleware.startListening.withTypes<RootState>();

startListening({
  actionCreator: setTheme,
  effect: (_, listenerApi) => {
    const theme = listenerApi.getState().theme.current;
    localStorage.setItem(localStoragKey, JSON.stringify({ current: theme }));
    updateCssVariables(theme);

    listenerApi.cancelActiveListeners();
  },
});

export default authSlice.reducer;

function randomColor() {
  return `${generateRandomInt(0, 255)} ${generateRandomInt(
    0,
    255
  )} ${generateRandomInt(0, 255)}`;
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateCssVariables(theme: keyof typeof themes) {
  let themeVariables = themes[theme];
  if (isFunction(themeVariables)) {
    themeVariables = themeVariables();
  }
  Object.entries(themeVariables || {}).forEach(([cssVar, value]) =>
    setCssVar(cssVar, value)
  );
}
