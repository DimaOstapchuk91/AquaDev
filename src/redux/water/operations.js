import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaDevApi, setAuthHeader } from "../service/configApi.js";
import { getFormattedDate } from "../../utils/formatDate.js";

export const getWaterDay = createAsyncThunk(
  "water/fetchDailyWaterInfo",
  async (date, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    setAuthHeader(token);
    try {
      if (!date) {
        date = getFormattedDate(new Date());
      }
      console.log(aquaDevApi.defaults.headers.common.Authorization);
      const { data } = await aquaDevApi.get(`/water/${date}`);
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
      const response = await aquaDevApi.patch(`/water/${year}-${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWaterPortion = createAsyncThunk(
  "water/aaddWaterPortion",
  async (credentials, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    setAuthHeader(token);
    try {
      const response = await aquaDevApi.post("/water", credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterPortion = createAsyncThunk(
  "/water/updateWaterPortion",
  async ({ id, credentials }, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    setAuthHeader(token);
    try {
      const response = await aquaDevApi.patch(`/water/${id}`, credentials);
      console.log("update", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterPortion = createAsyncThunk(
  "water/deleteWaterPortion",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    setAuthHeader(token);
    try {
      const { data } = await aquaDevApi.delete(`/water/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
