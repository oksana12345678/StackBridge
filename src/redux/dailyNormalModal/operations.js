import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
  "https://watertracker-app.onrender.com";

export const updateWaterRate = createAsyncThunk(
  "user/updateWaterRate",
  async (newWaterRate, thunkAPI) => {
    try {
      const response = await axios.patch(
        "/waterRate",
        newWaterRate
      );
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
