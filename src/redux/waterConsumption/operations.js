import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addWaterEntry,
  deleteWaterEntry,
  getWaterForToday,
  updateWaterEntry,
  getWaterForMonth,
} from "./api";
import { handleError } from "../service/apiErrorHandler";

const formatDate = (date, format = "long") =>
  `${date.getDate()} ${date.toLocaleString("en", {
    month: format,
  })} ${date.getFullYear()}`;

export const addWaterEntryThunk = createAsyncThunk(
  "waterNotes/addWater",
  async (water, thunkApi) => {
    try {
      const response = await addWaterEntry({
        water,
        date: formatDate(new Date()),
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(handleError(error));
    }
  }
);

export const deleteWaterEntryThunk = createAsyncThunk(
  "waterNotes/deleteWater",
  async (entryId, thunkApi) => {
    const { water } = thunkApi.getState();

    if (!water?.today?._id) return;

    try {
      const response = await deleteWaterEntry(water.today._id, entryId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(handleError(error));
    }
  }
);

export const updateWaterEntryThunk = createAsyncThunk(
  "waterNotes/updateWater",
  async ({ entryId, body }, thunkApi) => {
    const { water } = thunkApi.getState();

    if (!water?.today?._id) return;

    try {
      const response = await updateWaterEntry(water.today._id, entryId, body);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(handleError(error));
    }
  }
);

export const getWaterForTodayThunk = createAsyncThunk(
  "waterNotes/getTodayWater",
  async (_, thunkApi) => {
    try {
      const date = new Date();
      const response = await getWaterForToday(formatDate(date, "long"));
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(handleError(error));
    }
  }
);

export const getWaterForMonthThunk = createAsyncThunk(
  "waterNotes/getMonthWater",
  async ({ year, month }, thunkApi) => {
    try {
      const response = await getWaterForMonth(year, month);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(handleError(error));
    }
  }
);
