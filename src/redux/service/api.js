export const getWaterForTodayOne = async (date) => {
  const { data } = await axios.get(`/waterNotes/today`);
  return data;
};
