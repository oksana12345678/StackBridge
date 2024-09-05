import { createSlice } from "@reduxjs/toolkit";
import {
  updateWaterRate,
  fetchUserData,
} from "./operations";

const dailyNormalModalSlice = createSlice({
  name: "user",
  initialState: {
    gender: "",
    waterRate: 2.0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        updateWaterRate.fulfilled,
        (state, action) => {
          state.waterRate = action.payload.waterRate;
          state.error = null;
        }
      )
      .addCase(
        updateWaterRate.rejected,
        (state, action) => {
          state.error = action.error.message;
        }
      )
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

export default dailyNormalModalSlice.reducer;
