import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value : ["doctor12","doctor45"]
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    addDoctor: (state, action) => {
      console.log('addDoctor called')
      console.log(`action.payload is ${action.payload[0]}`)
      state.value.push("safdgsf")
      console.log(`state is ${state}`)
    },

  },
});

export const { addDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
