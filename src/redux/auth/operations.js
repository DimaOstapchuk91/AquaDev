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
  async ({credentials, navigate}, thunkApi) => {
    
    try {
      const { data } = await aquaDevApi.post(`users/register`, credentials);
      if(data.status === 201){
         navigate("/signin")
      }
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

      console.log(data)
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

