import { createSlice } from "@reduxjs/toolkit";

const localStorageToken = JSON.parse(localStorage.getItem("token"));

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorageToken ? localStorageToken : null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem("token", JSON.stringify(token));
    },
    logOut: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
      
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
