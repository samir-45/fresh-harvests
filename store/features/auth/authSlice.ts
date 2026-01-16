import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

type AuthState = {
  token: string | null;
  email: string | null;
  role: Role | null;
};

const initialState: AuthState = {
  token: typeof window === "undefined" ? null : localStorage.getItem("token"),
  email: typeof window === "undefined" ? null : localStorage.getItem("email"),
  role: typeof window === "undefined" ? null : (localStorage.getItem("role") as Role | null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // write reducers ----------------------------------------------------------

    //* This is to persist whole auth info session together
    setAuth(
      state,
      action: PayloadAction<{ token: string; email: string; role: Role }>
    ) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("role", action.payload.role);
      }
    },

    //* keep this if you still use it in some places
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      if (typeof window !== "undefined") localStorage.setItem("token", action.payload);
    },

    //* This is to clear all auth info on logout-------------------------------------
    logout(state) {
      state.token = null;
      state.email = null;
      state.role = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
      }
    },
    // write reducers Done ----------------------------------------------------------

  },
});

export const { setAuth, setToken, logout } = authSlice.actions;

//* selectors to use everywhere to verify role
export const selectRole = (s: any) => s.auth.role as Role | null;
export const selectIsAdmin = (s: any) =>
  s.auth.role === "ADMIN" || s.auth.role === "SUPER_ADMIN";

export default authSlice.reducer;
