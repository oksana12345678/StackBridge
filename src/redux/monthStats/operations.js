import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError } from "../service/apiErrorHandler";

// Отримання води за місяць
export const getWaterForMonth = createAsyncThunk(
  "water/getMonthWater",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(`/waterNotes/${year}/${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }
);
