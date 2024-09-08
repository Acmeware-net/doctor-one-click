import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctorInfo: localStorage.getItem('doctorInfo')
    ? JSON.parse(localStorage.getItem('doctorInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.doctorInfo = action.payload;
      localStorage.setItem('doctorInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.doctorInfo = null;
      localStorage.removeItem('doctorInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
