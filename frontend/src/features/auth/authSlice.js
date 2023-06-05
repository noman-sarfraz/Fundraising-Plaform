import { createSlice } from "@reduxjs/toolkit";

const localStorageUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: { user: localStorageUser ? localStorageUser : null },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
