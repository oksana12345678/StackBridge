import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWaterEntryThunk,
  deleteWaterEntryThunk,
  getWaterForTodayThunk,
  updateWaterEntryThunk,
  getWaterForMonthThunk,
} from "./operations";

const initialState = {
  today: null,
  itemsPerMonth: [],
  isLoading: false,
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

const handleFulfilled = (state, action) => {
  state.today = action.payload;
  state.isLoading = false;
  state.error = null;
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    clearWater: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getWaterForMonthThunk.fulfilled, (state, action) => {
        state.itemsPerMonth = action.payload;
      })
      .addMatcher(
        isAnyOf(
          addWaterEntryThunk.pending,
          deleteWaterEntryThunk.pending,
          getWaterForTodayThunk.pending,
          updateWaterEntryThunk.pending,
          getWaterForMonthThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          addWaterEntryThunk.rejected,
          deleteWaterEntryThunk.rejected,
          getWaterForTodayThunk.rejected,
          updateWaterEntryThunk.rejected,
          getWaterForMonthThunk.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          addWaterEntryThunk.fulfilled,
          deleteWaterEntryThunk.fulfilled,
          getWaterForTodayThunk.fulfilled,
          updateWaterEntryThunk.fulfilled
        ),
        handleFulfilled
      ),
});

export const { clearWater } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
