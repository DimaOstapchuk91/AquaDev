import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWaterPortion,
  deleteWaterPortion,
  getWaterDay,
  getWaterMonth,
  updateWaterPortion,
} from "./operations.js";
import { logout, refreshUser } from "../user/operations.js";

const initialState = {
  waterMonth: [],
  waterPortions: [],
  dateDay: null,
  totalWater: 0,
  loading: false,
  error: true,
};

const slice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
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
        state.totalWater = state.totalWater + action.payload.amount;
      })
      .addCase(updateWaterPortion.fulfilled, (state, action) => {
        state.totalWater = initialState.totalWater;
        state.waterPortions = state.waterPortions.map((item) =>
          item._id === action.payload._id
            ? {
                _id: action.payload._id,
                amount: action.payload.amount,
                time: action.payload.time,
              }
            : item
        );
        state.totalWater = state.waterPortions.reduce((acc, portion) => {
          return acc + portion.amount;
        }, 0);
      })
      .addCase(deleteWaterPortion.fulfilled, (state, action) => {
        state.waterPortions = state.waterPortions.filter(
          (item) => item._id !== action.payload._id
        );
        state.totalWater = state.totalWater - action.payload.amount;
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
        (state) => {
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
        (state) => {
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
        (state) => {
          state.loading = false;
          state.error = true;
        }
      );
  },
});

export const waterReducer = slice.reducer;
