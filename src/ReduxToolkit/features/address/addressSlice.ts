import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import addressService from 'services/address';

const addressAdapter = createEntityAdapter({});

const initialState = addressAdapter.getInitialState({
  status: 'idle',
  data: {
    firstName: 'Lautaro',
    lastName: 'Croatto',
    address: 'Edison 170',
    cuit: '27394765768',
  },
});

export const getAddress = createAsyncThunk<any, void>(
  'Address/getAddress',
  async () => {
    const addresses = await addressService.getWorkspaces();

    return addresses;
  }
);

export const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    upsertWorkspace: (state, action) => {
      addressAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAddress.fulfilled, (state, action) => {


        state.status = 'succeeded';
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = 'failed';
      })
  },
});

// selectors

// export const getWorkspacesError = (state) => state.Workspaces.error.addresses;

//actions
export const { upsertWorkspace } = addressSlice.actions;

export default addressSlice.reducer;
