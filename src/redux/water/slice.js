import { createSlice } from "@reduxjs/toolkit";
import { addWater, editWater } from "./operations";

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
      })
      .addCase(editWater.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      });
  },
});

export default waterSlice.reducer;
