import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUserInfo = createAsyncThunk(
  "user/fetchAllInfo",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
