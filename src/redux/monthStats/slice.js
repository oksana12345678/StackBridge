import { createSlice } from "@reduxjs/toolkit";
import { getMonthWater } from "./operations";

const handlePending = state => {
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const monthStatsSlice = createSlice({
  name: "monthStats",
  initialState: {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    daysStats: [],
    selectedDay: null,
    hoveredDay: null,
    error: null,
  },
  reducers: {
    prevMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear = state.currentYear - 1;
      } else {
        state.currentMonth = state.currentMonth - 1;
      }
    },
    nextMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear = state.currentYear + 1;
      } else {
        state.currentMonth = state.currentMonth + 1;
      }
    },

    hoverDayIndex(state, action) {
      state.hoveredDay = action.payload;
    },
    selectDay(state, action) {
      state.selectedDay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMonthWater.pending, handlePending)
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.daysStats = action.payload;
      })
      .addCase(getMonthWater.rejected, handleRejected);
  },
});

export const { prevMonth, nextMonth, hoverDayIndex, selectDay } =
  monthStatsSlice.actions;
export default monthStatsSlice.reducer;
