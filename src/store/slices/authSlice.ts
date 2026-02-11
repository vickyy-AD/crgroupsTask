import { createSlice } from '@reduxjs/toolkit';


interface AuthState  {
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState = {
   token: null,
  loading: false,
  error:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },logout(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
    }}
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;