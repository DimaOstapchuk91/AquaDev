import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaDevApi } from "../service/configApi.js";
import { getFormattedDate } from "../../utils/formatDate.js";

export const getWaterDay = createAsyncThunk(
  "water/fetchDailyWaterInfo",
  async (date, thunkAPI) => {
    try {
      if (!date) {
        date = getFormattedDate(new Date());
      }
      const { data } = await aquaDevApi.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  "/water/getWaterMonth",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await aquaDevApi.get(`/water/month/${year}-${month}`);
      return response.data.monthPortions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWaterPortion = createAsyncThunk(
  "water/addWaterPortion",
  async (credentials, thunkAPI) => {
    try {
      const response = await aquaDevApi.post("/water", credentials);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterPortion = createAsyncThunk(
  "/water/updateWaterPortion",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log("test");
      const response = await aquaDevApi.patch(`/water/${id}`, data);
      console.log("update", data);
      return response.data.data.userWater;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterPortion = createAsyncThunk(
  "water/deleteWaterPortion",
  async (id, thunkAPI) => {
    try {
      const { data } = await aquaDevApi.delete(`/water/${id}`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
