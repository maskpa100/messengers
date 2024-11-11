// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Auth {
  userId: number;
  email: string;
  avatar: string;
  family: string;
  name: string;
  webSocket: boolean;
  city: string;
}
const initialState: Auth = {
  userId: 0,
  email: "",
  avatar: "",
  family: "",
  name: "",
  webSocket: false,
  city: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        userId: number;
        email: string;
        family: string;
        name: string;
        avatar: string;
        city: string;
      }>
    ) {
      const { userId, email, family, name, avatar, city } = action.payload;
      state.userId = userId;
      state.email = email;
      state.avatar = avatar;
      state.city = city;
      state.family = family;
      state.name = name;
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
    setAvatar(
      state,
      action: PayloadAction<{
        avatar: string;
      }>
    ) {
      const { avatar } = action.payload;
      state.avatar = avatar;
    },
  },
});

export const { setCredentials, setWebSocket, setAvatar } = authSlice.actions;
export default authSlice.reducer;
