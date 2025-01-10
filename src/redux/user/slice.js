import { createSlice } from '@reduxjs/toolkit';
import { getAllUsersCount } from './operations';

const initialState = {
  usersCount: 0,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersCount.fulfilled, (state, action) => {
        state.loading = false;
        state.usersCount = action.payload; 
      })
      .addCase(getAllUsersCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const usersReducer = userSlice.reducer;
