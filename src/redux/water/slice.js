import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addWaterPortion,
  deleteWaterPortion,
  getWaterDay,
  getWaterMonth,
  updateWaterPortion,
} from './operations.js';
import { logout, refreshUser } from '../user/operations.js';

const initialState = {
  waterMonth: [],
  waterPortions: [],
  dateDay: null,
  totalWater: 0,
  loading: false,
  error: true,
};

const slice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.waterPortions = action.payload.waterPortions;
        state.totalWater = action.payload.totalWater;
        state.dateDay = action.payload.dateDay;
      })
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.waterMonth = action.payload;
      })
      .addCase(addWaterPortion.fulfilled, (state, action) => {
        state.waterPortions.push(action.payload);
      })
      .addCase(updateWaterPortion.fulfilled, (state, action) => {
        state.waterPortions = state.waterPortions.map(item =>
          item.id === action.payload._id
            ? {
                ...item,
                amount: action.payload.amount,
                time: action.payload.time,
              }
            : item
        );
      })
      .addCase(deleteWaterPortion.fulfilled, (state, action) => {
        state.waterPortions = state.waterPortions.filter(
          item => item.id !== action.payload
        );
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.rejected, () => initialState)
      .addMatcher(
        isAnyOf(
          getWaterDay.pending,
          getWaterMonth.pending,
          addWaterPortion.pending,
          updateWaterPortion.pending,
          deleteWaterPortion.pending
        ),
        state => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterDay.fulfilled,
          getWaterMonth.fulfilled,
          addWaterPortion.fulfilled,
          updateWaterPortion.fulfilled,
          deleteWaterPortion.fulfilled
        ),
        state => {
          state.loading = false;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterDay.rejected,
          getWaterMonth.rejected,
          addWaterPortion.rejected,
          updateWaterPortion.rejected,
          deleteWaterPortion.rejected
        ),
        state => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const waterReducer = slice.reducer;
