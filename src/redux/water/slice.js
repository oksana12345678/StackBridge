import { createSlice, createSelector } from "@reduxjs/toolkit";
import { addWater } from "./operations";
import { selectWater } from "./selectors";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    items: [],
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
      });
  },
});

export default waterSlice.reducer;
