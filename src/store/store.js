import { configureStore } from "@reduxjs/toolkit";
import { youtubeApi } from "./api/youtubeApi";
import { articleApiSlice } from "./api/articleApi";
import uiReducer from "./uiSlice";

// 🔹 Create a single shared instance — persists between navigations
let store;

export const makeStore = () => {
  if (!store) {
    store = configureStore({
      reducer: {
        [youtubeApi.reducerPath]: youtubeApi.reducer,
        [articleApiSlice.reducerPath]: articleApiSlice.reducer,
        ui: uiReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          youtubeApi.middleware,
          articleApiSlice.middleware
        ),
      devTools: process.env.NODE_ENV !== "production",
    });
  }
  return store;
};
