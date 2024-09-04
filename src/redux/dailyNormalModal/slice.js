import { createSlice } from "@reduxjs/toolkit";
import {
  updateWaterRate,
  fetchUserData,
} from "./operations";

const slice = createSlice({
  name: "user",
  initialState: {
    gender: "",
    waterRate: "",
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        updateWaterRate.fulfilled,
        (state, action) => {
          state.plannedWaterIntake =
            action.payload.plannedWaterIntake;
        }
      )
      .addCase(
        updateWaterRate.rejected,
        (state, action) => {
          state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
