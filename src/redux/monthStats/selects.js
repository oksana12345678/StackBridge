// Селектори для monthStats
export const selectCurrentMonth = (state) => state.monthStats.currentMonth;
export const selectCurrentYear = (state) => state.monthStats.currentYear;
export const selectDaysStats = (state) => state.monthStats.daysStats;
export const selectSelectedDay = (state) => state.monthStats.selectedDay;
export const selectHoveredDay = (state) => state.monthStats.hoveredDay;
