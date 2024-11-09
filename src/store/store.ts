import { configureStore } from "@reduxjs/toolkit";

import dialoguesReducer from "./slices/dialoguesSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // Добавляем редьюсеры
    dialogues: dialoguesReducer,
    auth: authReducer,
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
