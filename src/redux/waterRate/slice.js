import { createSlice } from "@reduxjs/toolkit";
import { updateWaterRate } from "./operations";

// `waterRate Slice`
const initialWaterRateState = {
  gender: "",
  waterRate: "",
  loading: false,
  error: null,
};
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterRateSlice = createSlice({
  name: "waterRate",
  initialState: initialWaterRateState,
  extraReducers: (builder) => {
    builder
      .addCase(updateWaterRate.pending, handlePending)
      .addCase(updateWaterRate.fulfilled, (state, action) => {
        state.waterRate = action.payload.waterRate;
      })
      .addCase(updateWaterRate.rejected, handleRejected);
  },
});

export const waterRateReducer = waterRateSlice.reducer;
