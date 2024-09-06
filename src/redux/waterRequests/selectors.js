// Селектори для water
export const selectWaterError = (state) => state.water.error;
export const selectWater = (state) => state.water.items;
export const selectLoading = (state) => state.water.isLoading;
export const selectError = (state) => state.water.error;

export const selectWatersToday = (state) => state.water.today;

