import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export const goitApi = axios.create({
  baseURL: "https://aquadev-back.onrender.com/",
});

const setAuthHeader = (token) => {
  return (goitApi.defaults.headers.common.Authorization = `Bearer ${token}`);
};
const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      // const password = credentials.password === credentials.confirmPassword;
      delete credentials.confirmPassword;

      const { data } = await goitApi.post("/users/register", credentials);
      console.log(data);
      console.log(setAuthHeader(data.token));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post("/users/login", credentials);
      console.log(setAuthHeader(data.data.accessToken));

      console.log(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const userToken = localStorage.getItem("persist:userToken");
    const parsedToken = JSON.parse(userToken);
    const cleanToken = parsedToken?.token?.replace(/"/g, "");
    console.log(cleanToken);

    await goitApi.post("/users/logout", null, {
      headers: {
        Authorization: `Bearer ${cleanToken}`, // Замініть <your-token-here> на актуальний токен
      },
    });
    // clearAuthHeader();
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const sevedToken = thunkAPI.getState().auth.token;
      if (!sevedToken) {
        return thunkAPI.rejectWithValue("Unable to fresh user");
      }
      // setAuthHeader(sevedToken);
      const { data } = await goitApi.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
