import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://watertracker-app.onrender.com";

export const getMonthWater = createAsyncThunk(
  "monthStats/getMonthWater",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://watertracker-app.onrender.com/waterNotes/${year}/${month}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
