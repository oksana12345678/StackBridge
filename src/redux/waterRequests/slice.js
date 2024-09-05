import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWater,
  editWater,
  updateWaterRate,
  getWaterForToday,
  getWaterForMonth,
  deleteWaterEntry,
  fetchUserData,
} from "./operations";

// Початковий стан для кожного slice'у
const initialWaterRateState = {
  gender: "",
  waterRate: "",
  loading: false,
  error: null,
};

const initialMonthStatsState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  daysStats: [],
  selectedDay: null,
  error: null,
};

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

// `waterRate Slice`
const waterRateSlice = createSlice({
  name: "waterRate",
  initialState: initialWaterRateState,
  extraReducers: (builder) => {
    builder
      .addCase(updateWaterRate.fulfilled, (state, action) => {
        state.waterRate = action.payload.waterRate;
      })
      .addCase(updateWaterRate.rejected, handleRejected)
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.gender = action.payload.gender || "";
        state.waterRate = action.payload.waterRate;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

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

// Експорт всіх слайсів
export const { prevMonth, nextMonth, hoverDayIndex, selectDay } =
  monthStatsSlice.actions;
export const { clearWater } = waterSlice.actions;
export const waterRateReducer = waterRateSlice.reducer;
export const monthStatsReducer = monthStatsSlice.reducer;
export const waterReducer = waterSlice.reducer;
