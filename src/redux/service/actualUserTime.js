// export const formatDateISOWithTimeZone = (date) => {
//   const localISODate = new Date(
//     date.getTime() - date.getTimezoneOffset() * 60000
//   )
//     .toISOString()
//     .split("T")[0];

//   return localISODate;
// };

// const getUserTimeZone = () => {
//   return Intl.DateTimeFormat().resolvedOptions().timeZone;
// };

// export const convertUTCToUserLocalTime = (dateString) => {
//   const userTimeZone = getUserTimeZone();
//   const date = new Date(dateString);
//   return date.toLocaleString("eu-EU", { timeZone: userTimeZone });
// };

// export const convertToLocalTime = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleString();
// };

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
