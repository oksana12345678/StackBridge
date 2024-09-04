import axios from "axios";

axios.defaults.baseURL = "https://watertracker-app.onrender.com"; /* TODO */

export const addWaterEntry = async (waterData) => {
  const { data } = await axios.post("/water", waterData);
  return data;
};

export const deleteWaterEntry = async (dayId, entryId) => {
  const { data } = await axios.delete(`/water/${dayId}/${entryId}`);
  return data;
};

export const getWaterForToday = async (date) => {
  const { data } = await axios.get(`/water/today`);
  return data;
};

export const getWaterForMonth = async (year, month) => {
  const { data } = await axios.get(`/water/month?year=${year}&month=${month}`);
  return data;
};

export const updateWaterEntry = async (dayId, entryId, updatedData) => {
  const { data } = await axios.put(`/water/${dayId}/${entryId}`, updatedData);
  return data;
};
