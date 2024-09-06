import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
