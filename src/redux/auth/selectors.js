export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserEmail = (state) => state.auth.user;
export const selectErrorAuth = (state) => state.auth.isError;
export const selectIsRegistered = (state) => state.auth.isRegistered;
export const selectToken = (state) => state.auth.token;

// refresh
export const selectUserGender = (state) => state.auth.user.gender;
export const selectWaterRateUpdate = (state) => state.auth.user.waterRate;
export const selectLoadingUserData = (state) => state.auth.loading;
