import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
}

interface ConfirmationModalState {
  [key: string]: ModalState;
}

const initialState: ConfirmationModalState = {};

const confirmationModalSlice = createSlice({
  name: "confirmation_modal",
  initialState,
  reducers: {
    openCnfModal: (
      state,
      action: PayloadAction<{
        modalName: string;
        title: string;
        description: string;
      }>
    ) => {
      const { modalName, title, description } = action.payload;
      state[modalName] = {
        isOpen: true,
        title,
        description,
      };
    },
    closeCnfModal: (state, action: PayloadAction<{ modalName: string }>) => {
      const { modalName } = action.payload;
      state[modalName] = {
        isOpen: false,
        title: "",
        description: "",
      };
    },
  },
});

export const { openCnfModal, closeCnfModal } = confirmationModalSlice.actions;
export const selectCnfModal = (state: {
  confirmation_modal: ConfirmationModalState;
}) => state.confirmation_modal;

export default confirmationModalSlice.reducer;
