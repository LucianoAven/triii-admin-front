import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = mainSlice.actions;

export default mainSlice.reducer;