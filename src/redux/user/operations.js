import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { aquaDevApi, setAuthHeader } from "../service/configApi.js";

export const getAllUsersCount = createAsyncThunk(
  "user/getAllUsersCount",
  async (_, thunkAPI) => {
    try {
      const response = await aquaDevApi.get("/users/count");
      return response.data.usersAmount.usersAmount;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users count"
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ credentials, navigate }, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/register", credentials);
      if (data.status === 201) {
        await thunkApi.dispatch(logIn(credentials));
        navigate("/tracker");
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/login", credentials);
      console.log(data.data.accessToken);

      setAuthHeader(data.data.accessToken);

      return data.data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    await aquaDevApi.post("/users/logout");
    setAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/refresh");
      setAuthHeader();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//=========================
export const updateUser = createAsyncThunk(
  "user/update",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.patch("/users/update", credentials);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getUserInformation = createAsyncThunk(
  "user/data",
  async (_, thunkApi) => {
    try {
      const { data } = await aquaDevApi.get("/users/data");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
