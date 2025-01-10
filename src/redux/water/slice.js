import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchDailyWaterInfo } from './operations.js';

const initialState = {
  waterInfo: {
    // dailyNorma: 1500,
    waterPortions: [],
    totalWater: 0,
    error: null,
  },
};

const slice = createSlice({
  name: 'waterInfo',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchDailyWaterInfo.fulfilled, (state, action) => {
        state.waterInfo.waterPortions = action.payload.waterPortions;
        state.waterInfo.totalWater = action.payload.totalWater;
      })
      .addCase(fetchDailyWaterInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const waterReducer = slice.reducer;
