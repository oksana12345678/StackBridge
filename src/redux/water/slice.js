import { createSlice } from "@reduxjs/toolkit";
import { addWater, editWater, getWaterToday } from "./operations";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    items: [],
    itemsToday: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addWater.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editWater.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(getWaterToday.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getWaterToday.fulfilled, (state, action) => {
        state.itemsToday = action.payload;
        state.loading = false;
      })
      .addCase(getWaterToday.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default waterSlice.reducer;
