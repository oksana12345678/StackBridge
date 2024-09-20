import axios from "axios";

export const UpdatePassword = async (userData) => {
  const response = await axios.post("auth/update-password", userData);

  return response.data;
};
