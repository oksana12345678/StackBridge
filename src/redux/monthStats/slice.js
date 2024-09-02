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
    error: null,
  },
  reducers: {
    prevMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11;
        state.currentYear = state.currentYear - 1;
        state.selectedDay = null;
      } else {
        state.currentMonth = state.currentMonth - 1;
        state.selectedDay = null;
      }
    },
    nextMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0;
        state.currentYear = state.currentYear + 1;
        state.selectedDay = null;
      } else {
        state.currentMonth = state.currentMonth + 1;
        state.selectedDay = null;
      }
    },
    toggleModal(state, action) {
      state.selectedDay = action.payload || null;
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

export const { prevMonth, nextMonth, toggleModal } = monthStatsSlice.actions;
export default monthStatsSlice.reducer;
