// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  username: "",
  avatar: "",
  webSocket: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        userId: number;
        username: string;
        avatar: string;
      }>
    ) {
      const { userId, username, avatar } = action.payload;
      state.userId = userId;
      state.username = username;
      state.avatar = avatar;
    },
    setWebSocket(
      state,
      action: PayloadAction<{
        webSocket: boolean;
      }>
    ) {
      const { webSocket } = action.payload;
      state.webSocket = webSocket;
    },
  },
});

export const { setCredentials, setWebSocket } = authSlice.actions;
export default authSlice.reducer;
