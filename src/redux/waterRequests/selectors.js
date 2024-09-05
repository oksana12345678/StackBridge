// Селектори для monthStats
export const selectCurrentMonth = (state) => state.monthStats.currentMonth;
export const selectCurrentYear = (state) => state.monthStats.currentYear;
export const selectDaysStats = (state) => state.monthStats.daysStats;
export const selectSelectedDay = (state) => state.monthStats.selectedDay;
export const selectHoveredDay = (state) => state.monthStats.hoveredDay;
// Селектори для water
export const selectWaterError = (state) => state.water.error;
export const selectWater = (state) => state.water.items;
export const selectLoading = (state) => state.water.isLoading;
export const selectError = (state) => state.water.error;

export const selectWatersToday = (state) => state.water.today;

export const selectWaterRate = (state) => state.waterRate.waterRate;

export const selectLoadingWaterRate = (state) => state.waterRate.loading;

export const selectErrorWaterRate = (state) => state.waterRate.error;
