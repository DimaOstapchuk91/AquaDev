import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaDevApi, setAuthHeader } from "../service/configApi.js";

export const fetchDailyWaterInfo = createAsyncThunk(
  "water/fetchDailyWaterInfo",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("token not found");
    setAuthHeader(token);

    console.log(
      "Auth Header Set:",
      aquaDevApi.defaults.headers.common.Authorization
    );
    try {
      const response = await aquaDevApi.get("/water");
      console.log("Fetch water data", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
