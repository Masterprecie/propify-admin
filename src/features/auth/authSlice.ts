import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./interfaces";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
        isAuthenticated: boolean;
      }>
    ) {
      const { user, accessToken, refreshToken, isAuthenticated } =
        action.payload;
      localStorage.setItem(
        "@propify_admin_user",
        JSON.stringify({
          user,
          accessToken,
          refreshToken,
          isAuthenticated,
        })
      );
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = isAuthenticated;
    },
    logout(state) {
      localStorage.removeItem("@propify_admin_user");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
