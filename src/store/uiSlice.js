import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeFeedPage: 1,
  isFloatingVideoEnabled: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHomeFeedPage: (state, action) => {
      state.homeFeedPage = action.payload;
    },
    resetHomeFeedPage: (state) => {
      state.homeFeedPage = 1;
    },
    disableFloatingVideo: (state) => {
      state.isFloatingVideoEnabled = false;
    },
  },
});

export const { setHomeFeedPage, resetHomeFeedPage, disableFloatingVideo } =
  uiSlice.actions;
export default uiSlice.reducer;
