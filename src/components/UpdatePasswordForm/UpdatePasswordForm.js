export const UpdatePassword = async (userData) => {
  try {
    const response = await axios.post("auth/update-password", userData);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
