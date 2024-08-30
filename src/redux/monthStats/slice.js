import { createSlice } from '@reduxjs/toolkit';

const monthStatsSlice = createSlice({
  name: 'monthStats',
  initialState: {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
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
  },
});

export const { prevMonth, nextMonth } = monthStatsSlice.actions;
export default monthStatsSlice.reducer;
