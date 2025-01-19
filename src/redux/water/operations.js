import { createAsyncThunk } from "@reduxjs/toolkit";
import { aquaDevApi, setAuthHeader } from "../service/configApi.js";
import { getFormattedDate } from "../../utils/formatDate.js";
import { errToast, successfullyToast } from "../../utils/toast.js";

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
  async (setDate, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }
    setAuthHeader(token);
    try {
      const response = await aquaDevApi.get(`/water/month/${setDate}`);
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

      if (response.status === 201) {
        successfullyToast("Water portion added successfully");
      }

      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errToast("Invalid data provided");
      } else if (error.response && error.response.status === 500) {
        errToast("Server error. Please try again later.");
      } else {
        errToast("An unexpected error occurred");
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterPortion = createAsyncThunk(
  "/water/updateWaterPortion",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await aquaDevApi.patch(`/water/${id}`, data);

      if (response.status === 200 || response.status === 204) {
        successfullyToast("Water portion updated successfully");
      }

      return response.data.data.userWater;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errToast("Invalid data provided for update");
      } else if (error.response && error.response.status === 404) {
        errToast("Water portion not found");
      } else if (error.response && error.response.status === 500) {
        errToast("Server error. Please try again later.");
      } else {
        errToast("An unexpected error occurred during update");
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterPortion = createAsyncThunk(
  "water/deleteWaterPortion",
  async (id, thunkAPI) => {
    try {
      const { data } = await aquaDevApi.delete(`/water/${id}`);

      if (data && data.status === 200) {
        successfullyToast("Water portion deleted successfully");
      }

      return data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        errToast("Water portion not found");
      } else if (error.response && error.response.status === 500) {
        errToast("Server error. Please try again later.");
      } else {
        errToast("An unexpected error occurred during deletion");
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
