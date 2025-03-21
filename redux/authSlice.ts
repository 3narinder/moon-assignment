import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/constants/Types";

interface AuthState {
  user: User | null;
  loggedIn: boolean;
}

const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const loggedInStatus =
  typeof window !== "undefined" ? localStorage.getItem("loggedIn") : "false";

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loggedIn: loggedInStatus === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const userData: User = JSON.parse(storedUser);
      if (
        userData.email === action.payload.email &&
        userData.password === action.payload.password
      ) {
        state.user = userData;
        state.loggedIn = true;
        localStorage.setItem("loggedIn", "true");
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.setItem("loggedIn", "false");
    },
    register: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("loggedIn", "true");
      state.user = action.payload;
      state.loggedIn = true;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
