export const handleError = (error) => {
  const errorCode = error?.response?.status || 500;
  const errorMessage = error?.response?.data?.message || "Server error";

  return { errorMessage, errorCode };
};
