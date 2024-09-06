import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWater,
  editWater,
  getWaterForToday,
  deleteWaterEntry,
} from "./operations";

// Початковий стан для кожного slice'у

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

const handleFulfilled = (state, action) => {
  state.today = action.payload;
  state.isLoading = false;
  state.error = null;
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
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(editWater.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.isLoading = false;
      })

      .addMatcher(
        isAnyOf(
          deleteWaterEntry.pending,
          getWaterForToday.pending,
          editWater.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          deleteWaterEntry.rejected,
          getWaterForToday.rejected,
          editWater.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          addWater.fulfilled,
          deleteWaterEntry.fulfilled,
          getWaterForToday.fulfilled,
          editWater.fulfilled
        ),
        handleFulfilled
      );
  },
});

export const { clearWater } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
