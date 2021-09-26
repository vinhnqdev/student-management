import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface User {
  token: null | string;
  isLoggedIn: boolean;
  expirationTime: string;
}
export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
          expirationTime: action.payload.expirationTime,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
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
