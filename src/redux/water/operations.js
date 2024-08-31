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
