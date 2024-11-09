import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Messages = {
  id: number;
  time: string;
  from_user: number;
  to_user: number;
  message: string;
  delivered: boolean;
};
type User = {
  id: number;
  email: string;
  family: string;
  name: string;
  avatar: string;
  time: string;
};
type Dialog_user = {
  id: number;
  email: string;
  family: string;
  name: string;
  avatar: string;
  time: string;
};
export type Dialogue = {
  dialog_userId: number;
  userId: number;
  dialog_user: Dialog_user;
  messages: Messages[];
};
interface dialoguesState {
  dialogues?: Dialogue[];
}

const initialState: dialoguesState = {
  dialogues: [],
};

const dialoguesSlice = createSlice({
  name: "dialogues",
  initialState,
  reducers: {
    addDialogue: (state, action: PayloadAction<Dialogue>) => {
      if (!Array.isArray(state.dialogues)) {
        state.dialogues = [];
      }

      const existingDialogueIndex = state.dialogues.findIndex(
        (dialogue) => dialogue.dialog_userId === action.payload.dialog_userId
      );
      console.log(existingDialogueIndex);

      if (existingDialogueIndex >= 0) {
        const existingDialogue = state.dialogues[existingDialogueIndex];

        if (action.payload.messages.length > 0) {
          const newMessages = action.payload.messages.filter(
            (newMessage) =>
              !existingDialogue.messages.some(
                (existingMessage) => existingMessage.id === newMessage.id
              )
          );

          existingDialogue.messages.push(...newMessages);
          existingDialogue.messages.sort((a, b) => a.id - b.id);
        }
      } else {
        state.dialogues.push(action.payload);
      }
    },
    setDialogues(state, action: PayloadAction<Dialogue[]>) {
      state.dialogues = action.payload;
    },
    updateMessagesForUser: (
      state,
      action: PayloadAction<{
        dialog_userId: number;
        from_user: number;
        updatedMessage: Partial<Messages>;
      }>
    ) => {
      const { dialog_userId, from_user, updatedMessage } = action.payload;

      const dialogue = state.dialogues?.find(
        (dialogue) => dialogue.dialog_userId === dialog_userId
      );

      if (dialogue) {
        dialogue.messages = dialogue.messages.map((message) =>
          message.from_user === from_user
            ? { ...message, ...updatedMessage }
            : message
        );
      }
    },
  },
});

export const { addDialogue, setDialogues, updateMessagesForUser } =
  dialoguesSlice.actions;
export default dialoguesSlice.reducer;
