import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';


interface UserData {
  name: string;
  email: string;
  role: string;
  // Add any additional user fields here
}

interface AuthUser {
  user: UserData;
  token: string;
  message: string;
}

interface AuthState {
  authUser: AuthUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  authUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.authUser = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
    },
  },
});

export const { setLoading, setAuthUser, logout } = userSlice.actions;

export default userSlice.reducer;
