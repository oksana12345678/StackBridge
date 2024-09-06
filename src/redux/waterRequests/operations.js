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
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/waterNotes/${_id}`);
      return _id;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

// Отримання води за сьогодні
export const getWaterForToday = createAsyncThunk(
  "water/getTodayWater",
  async (_, thunkAPI) => {
    try {
      // const date = convertToLocalTime();

      const response = await axios.get("/waterNotes/today");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);
