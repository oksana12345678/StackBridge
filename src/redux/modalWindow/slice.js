import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    settingModalOpen: false,
    logOutModal: false,
    isUserLogoModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      // state.settingModalOpen = false;
      state.logOutModal = false;
      state.isUserLogoModalOpen = false;
    },
    settingModalOpen: (state) => {
      state.settingModalOpen = true;
    },
    logOutModal: (state) => {
      state.logOutModal = true;
    },
    userLogoModal: (state) => {
      state.isUserLogoModalOpen = true;
    },
  },
});

export const {
  openModal,
  closeModal,
  settingModalOpen,
  logOutModal,
  userLogoModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
