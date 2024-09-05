import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./operations";

const userSlice = createSlice({
  name: "user",
  initialUserState: {
    gender: "",
    waterRate: "",
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.gender = action.payload.gender || "";
        state.waterRate = action.payload.waterRate || 2.0;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const userReducer = userSlice.reducer;
