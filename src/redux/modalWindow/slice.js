import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.contactIdToDelete = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.contactIdToDelete = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
