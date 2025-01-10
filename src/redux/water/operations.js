import { createAsyncThunk } from '@reduxjs/toolkit';
import { aquaDevApi } from '../service/configApi.js';

export const fetchDailyWaterInfo = createAsyncThunk(
  'water/fetchDailyWaterInfo',
  async (_, thunkAPI) => {
    try {
      const response = await aquaDevApi.get('/water');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
