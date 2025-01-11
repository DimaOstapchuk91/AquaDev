import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getAllUsersCount,
  logout,
  logIn,
  register,
  updateUser,
  getUserInformation,
} from "./operations";

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
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(getAllUsersCount.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.usersCount = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.user };
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          getAllUsersCount.pending,
          updateUser.pending,
          getUserInformation.pending
        ),
        (state) => {
          state.isRefreshing = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          getAllUsersCount.rejected,
          updateUser.rejected,
          getUserInformation.rejected,
          (state) => {
            state.isRefreshing = false;
          }
        )
      );
  },
});

export const userReducer = slice.reducer;
