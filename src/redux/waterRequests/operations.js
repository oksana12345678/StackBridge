import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../service/apiErrorHandler";

// axios.defaults.baseURL = "https://watertracker-app.onrender.com";

// Форматування дати
const formatDate = (date, format = "long") =>
  `${date.getDate()} ${date.toLocaleString("en", {
    month: format,
  })} ${date.getFullYear()}`;

// Додавання нової води
export const addWater = createAsyncThunk(
  "water/addWater",
  async (newWaterRecord, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://watertracker-app.onrender.com/waterNotes",
        newWaterRecord
      );
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
      const response = await axios.patch(
        `https://watertracker-app.onrender.com/waterNotes/${id}`,
        updates
      );
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
      const response = await axios.delete(
        `https://watertracker-app.onrender.com/waterNotes/${entryId}`
      );
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
      // Форматування дати в ISO-формат
      const date = formatDateISO(new Date());

      // Виконання запиту з передачею дати в форматі ISO
      const response = await axios.get(
        `https://watertracker-app.onrender.com/waterNotes/today?date=${date}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

// Отримання води за місяць
export const getWaterForMonth = createAsyncThunk(
  "water/getMonthWater",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://watertracker-app.onrender.com/waterNotes/${year}/${month}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);

// Оновлення норми води
export const updateWaterRate = createAsyncThunk(
  "water/updateWaterRate",
  async (newWaterRate, thunkAPI) => {
    try {
      const response = await axios.patch("/waterRate", newWaterRate);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserDate",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
