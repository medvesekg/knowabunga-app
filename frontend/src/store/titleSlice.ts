import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "title",
  initialState: {
    content: "",
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes.
    // Also, no return statement is required from these functions.
    setTitle: (state, action) => {
      state.content = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTitle } = authSlice.actions;

export default authSlice.reducer;
