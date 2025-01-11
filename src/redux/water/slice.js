import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchDailyWaterInfo } from "./operations.js";

const initialState = {
  waterInfo: {
    waterPortions: [],
    totalWater: 0,
    error: null,
  },
};

const slice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyWaterInfo.fulfilled, (state, action) => {
        state.waterInfo.waterPortions = action.payload.waterPortions;
        state.waterInfo.totalWater = action.payload.totalWater;
        console.log("water in state:", state.waterInfo.totalWater);
      })
      .addCase(fetchDailyWaterInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const waterReducer = slice.reducer;
