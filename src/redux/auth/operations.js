import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const aquaDevApi = axios.create({
  baseURL: "https://aquadev-back.onrender.com/",
  withCredentials: true,
});

const setAuthHeader = (token) => {
  aquaDevApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post(`users/register`, credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post(`users/login`, credentials);
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await aquaDevApi.post(`users/logout`);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const savedToken = thunkApi.getState().auth.token;

      if (!savedToken) {
        return thunkApi.rejectWithValue("Token does not exist");
      }

      setAuthHeader(savedToken);

      const { data } = await aquaDevApi.get(`users/refresh`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
