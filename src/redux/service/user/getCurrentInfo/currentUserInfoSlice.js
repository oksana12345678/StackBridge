import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserInfo } from "./fetchCurrentUserData";

const handlePending = (state) => {
  state.loading = true;
};

const handleError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const currentUserInfoSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserInfo.pending, handlePending)
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(getCurrentUserInfo.rejected, handleError);
  },
});

export const usersReducer = currentUserInfoSlice.reducer;
