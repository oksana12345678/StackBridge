import axios from "axios";

export const requestResetPasswordEmail = async (userData) => {
  const response = await axios.post("auth/forgot-password", userData);

  return response.data;
};
