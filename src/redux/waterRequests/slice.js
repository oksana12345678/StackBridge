import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWater,
  editWater,
  getWaterForToday,
  deleteWaterEntry,
} from "./operations";

// Початковий стан

const initialWaterState = {
  today: null,
  items: [],
  isLoading: false,
  error: null,
};

// Xендлери для стану
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// `Water Slice`
const waterSlice = createSlice({
  name: "water",
  initialState: initialWaterState,
  reducers: {
    clearWater: () => initialWaterState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.today.todayWaterNotesList.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(editWater.fulfilled, (state, action) => {
        const index = state.today.todayWaterNotesList.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.today.todayWaterNotesList[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(getWaterForToday.pending, handlePending)
      .addCase(getWaterForToday.fulfilled, (state, action) => {
        state.today = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getWaterForToday.rejected, handleRejected)
      .addCase(deleteWaterEntry.pending, handlePending)
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.today.todayWaterNotesList.findIndex(
          (water) => String(water._id) === String(action.payload)
        );

        if (index !== -1) {
          state.today.todayWaterNotesList.splice(index, 1);
        }
      })
      .addCase(deleteWaterEntry.rejected, handleRejected);
  },
});

export const { clearWater } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
