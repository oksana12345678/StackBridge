import { createSlice } from "@reduxjs/toolkit";
import { getWaterForMonth } from "./operations";

const initialMonthStatsState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  daysStats: [],
  selectedDay: null,
  hoveredDay: null,
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

// `Month Stats Slice`
const monthStatsSlice = createSlice({
  name: "monthStats",
  initialState: initialMonthStatsState,
  reducers: {
    prevMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear -= 1;
      } else {
        state.currentMonth -= 1;
      }
      state.selectedDay = null;
    },
    nextMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear += 1;
      } else {
        state.currentMonth += 1;
      }
      state.selectedDay = null;
    },
    hoverDayIndex(state, action) {
      state.hoveredDay = action.payload;
    },
    selectDay(state, action) {
      state.selectedDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaterForMonth.pending, handlePending)
      .addCase(getWaterForMonth.fulfilled, (state, action) => {
        state.daysStats = action.payload;
      })
      .addCase(getWaterForMonth.rejected, handleRejected);
  },
});

export const { prevMonth, nextMonth, hoverDayIndex, selectDay } =
  monthStatsSlice.actions;

export const monthStatsReducer = monthStatsSlice.reducer;
