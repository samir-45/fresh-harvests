import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import { api } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // After making the api, add the api reducer here
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  // middleware for rtk query to use as interceptor before any requiest is proceeded
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

// TODO these I need to be explained

// These will go to typescript definitions for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
