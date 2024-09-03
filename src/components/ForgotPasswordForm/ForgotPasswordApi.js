import axios from "axios";

export const requestResetPasswordEmail = async (userData) => {
  try {
    const response = await axios.post("auth/forgot-password", userData);

    return response.data;
  } catch (error) {
    throw error;
  }
};
