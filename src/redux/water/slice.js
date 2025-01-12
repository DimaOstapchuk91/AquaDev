import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchDailyWaterInfo } from "./operations.js";

const initialState = {
  waterInfo: {
    waterPortions: [],
    totalWater: 0,
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyWaterInfo.pending, (state, action) => {
        state.waterInfo.loading = true;
      })
      .addCase(fetchDailyWaterInfo.fulfilled, (state, action) => {
        state.waterInfo.loading = false;
        state.waterInfo.error = null;
        state.waterInfo.waterPortions = action.payload.waterPortions;
        state.waterInfo.totalWater = action.payload.totalWater;
      })
      .addCase(fetchDailyWaterInfo.rejected, (state, action) => {
        state.waterInfo.loading = false;
        state.waterInfo.error = action.payload;
      });
  },
});

export const waterReducer = slice.reducer;
