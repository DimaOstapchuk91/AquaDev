import { createAsyncThunk } from "@reduxjs/toolkit";
import { errToast, successfullyToast } from "../../utils/toast.js";
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
        successfullyToast("Successfully Register");
        navigate("/signin");
      }
      return data;
    } catch (error) {
      if (error.status === 409) {
        errToast("Email in use");
        return;
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await aquaDevApi.post("/users/login", credentials);

      console.log("Login data:", data.data);

      if (data.status === 200) {
        setAuthHeader(data.data.accessToken);
        console.log(aquaDevApi.defaults.headers.common.Authorization);
        successfullyToast("Successfully logged");
      }

      return data.data.accessToken;
    } catch (error) {
      if (error.status === 404) {
        errToast("No such user exists");
        return;
      }

      if (error.status === 401) {
        errToast("Invalid password");
        return;
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    const { data } = await aquaDevApi.post("/users/logout");
    if (data.status === 204) {
      successfullyToast("Goodbye");
      setAuthHeader();
    }
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

// export const refreshUser = createAsyncThunk(
//   "user/refreshUser",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await aquaDevApi.post("/users/refresh");
//       setAuthHeader(data.data.accessToken);
//       console.log(data);
//       return data.data.accessToken;
//     } catch (error) {
//       return thunkApi.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const updateUser = createAsyncThunk(
  "user/update",
  async (credentials, thunkApi) => {
    const token = thunkApi.getState().user.token;
    console.log(token);
    if (!token) {
      return thunkApi.rejectWithValue("Token not found");
    }
    setAuthHeader(token);

    const formData = new FormData();
    Object.entries(credentials).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const { data } = await aquaDevApi.patch("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getDataUser",
  async (_, thunkApi) => {
    // const token = thunkApi.getState().user.token;
    // console.log(token);
    // if (!token) {
    //   return thunkApi.rejectWithValue("Token not found");
    // }

    // setAuthHeader(token);
    try {
      console.log(aquaDevApi.defaults.headers.common.Authorization);
      const { data } = await aquaDevApi.get("/users/data");
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "user/refreshUser",
  async (_, thunkAPI) => {
    try {
      // Отримуємо збережений токен з локал стореджа
      const state = thunkAPI.getState();
      const savedToken = state.user.token;

      // якщо там нічого нема, не виконуємо запит
      if (!savedToken) {
        return thunkAPI.rejectWithValue("Token does not exist!");
      }
      // якщо є - встановлюємо по замовчуванню хедер авторизації для запитів

      setAuthHeader(savedToken);
      // робимо запит за обліковими даними
      const { data } = await aquaDevApi.get("/users/data");
      console.log("GET refreshed user data:", data);
      // повертаємо дані в слайс для опрацювання
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
