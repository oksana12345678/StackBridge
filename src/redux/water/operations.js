import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWater = createAsyncThunk(
  "water/addWater",
  async (newWaterRecord, thunkAPI) => {
    try {
      const response = await axios.post("/water", newWaterRecord);
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
      const response = await axios.patch(`/water/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
