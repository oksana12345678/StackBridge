import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../service/apiErrorHandler";

// Додавання нової води
export const addWater = createAsyncThunk(
  "water/addWater",
  async (newWaterRecord, thunkAPI) => {
    try {
      const response = await axios.post("/waterNotes", newWaterRecord);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Оновлення запису про воду
export const editWater = createAsyncThunk(
  "water/editWater",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.patch(`/waterNotes/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалення запису про воду
export const deleteWaterEntry = createAsyncThunk(
  "water/deleteWater",
  async (entryId, thunkAPI) => {
    try {
      const response = await axios.delete(`/waterNotes/${entryId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);
const formatDateISO = (date) => date.toISOString().split("T")[0];
// Отримання води за сьогодні
export const getWaterForToday = createAsyncThunk(
  "water/getTodayWater",

  async (_, thunkAPI) => {
    try {
      const date = formatDateISO(new Date());

      const response = await axios.get(`/waterNotes/today?date=${date}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);
