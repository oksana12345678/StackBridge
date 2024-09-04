import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWater = createAsyncThunk(
  "waterNotes/addWater",
  async (newWaterRecord, thunkAPI) => {
    try {
      const response = await axios.post("/waterNotes", newWaterRecord);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWater = createAsyncThunk(
  "waterNotes/editWater",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.patch(`/waterNotes/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
