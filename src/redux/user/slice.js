import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersCount, logout, logIn, register } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    timeActive: null,
    deilyNorma: null,
    avatar: null,
  },
  usersCount: 0,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(getAllUsersCount.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(getAllUsersCount.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.usersCount = action.payload;
      })
      .addCase(getAllUsersCount.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = slice.reducer;
