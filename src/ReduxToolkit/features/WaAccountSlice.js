import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const editWaAccountSlice = createSlice({
  name: 'AccountWa',
  initialState,
  reducers: {
    setCuentaWsp: (state, action) => {
      // state.estado = action.payload
      state.value = { ...state.value, ...action.payload };
    },
    closeCuentaWsp: (state) => {
      const closeAccountWA = {};
      state.value = closeAccountWA;
    },
    changeNameAccount: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCuentaWsp, closeCuentaWsp, changeNameAccount } =
  editWaAccountSlice.actions;
export const waAccountEdit = (state) => state.AccountWa.value;

export default editWaAccountSlice.reducer;
