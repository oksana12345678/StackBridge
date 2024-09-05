import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getWaterToday = createAsyncThunk(
  "water/getWaterToday",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://watertracker-app.onrender.com/waterNotes/today"
      );
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
