import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllUsersCount,
  logout,
  logIn,
  register,
  refreshUser,
  getUserData,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    timeActive: null,
    dailyNorma: null,
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
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
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
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, () => initialState)
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          logout.pending,
          refreshUser.pending,
          getUserData.pending
        ),
        (state) => {
          state.isRefreshing = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          logout.rejected,
          getUserData.rejected
        ),
        (state) => {
          state.isRefreshing = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          logIn.fulfilled,
          logout.fulfilled,
          refreshUser.fulfilled,
          getUserData.fulfilled
        ),
        (state) => {
          state.isRefreshing = false;
          state.error = false;
        }
      );
  },
});

export const userReducer = slice.reducer;
