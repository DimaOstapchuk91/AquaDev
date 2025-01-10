import { createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '../service/configApi';

export const getAllUsersCount = createAsyncThunk(
  'users/getAllUsersCount',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/count'); 
      return response.data.usersAmount.usersAmount; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users count'
      );
    }
  }
);
