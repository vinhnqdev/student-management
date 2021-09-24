import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface User {
  email: string;
  token: null | string;
  isLoggedIn: boolean;
  // fullName: string;
}
export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    testAuth: (state) => {
      return state;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Auth Actions
export const authActions = authSlice.actions;

// Auth Selector
export const selectUser = (state: RootState) => state.auth.user;

// Auth Reducer
const authReducer = authSlice.reducer;

export default authReducer;
