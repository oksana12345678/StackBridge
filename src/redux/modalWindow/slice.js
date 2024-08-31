import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    settingModalOpen: false,
    logOutModal: false,
    isUserLogoModalOpen: false,
    isDeleteEntryModalOpen:false,
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
      state.isDeleteEntryModalOpen = false;
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
    deleteEntryModalOpen:(state)=>{
      state.isDeleteEntryModalOpen=true;
    }
  },
});

export const {
  openModal,
  closeModal,
  settingModalOpen,
  logOutModal,
  userLogoModal,
  deleteEntryModalOpen,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
