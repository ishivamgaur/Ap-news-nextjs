import { configureStore } from "@reduxjs/toolkit";
import { youtubeApi } from "./api/youtubeApi";
import { articleApiSlice } from "./api/articleApi";
import { searchApi } from "./api/searchApi";
import uiReducer from "./uiSlice";
import { entertainmentApi } from "./api/entertainment";

// 🔹 Create a single shared instance — persists between navigations
let store;

export const makeStore = () => {
  if (!store) {
    store = configureStore({
      reducer: {
        [youtubeApi.reducerPath]: youtubeApi.reducer,
        [articleApiSlice.reducerPath]: articleApiSlice.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [entertainmentApi.reducerPath]: entertainmentApi.reducer,

        ui: uiReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          youtubeApi.middleware,
          articleApiSlice.middleware,
          searchApi.middleware,
          entertainmentApi.middleware
        ),
      devTools: process.env.NODE_ENV !== "production",
    });
  }
  return store;
};
