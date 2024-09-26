import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subdomainService from '../../services/subdomain';

const initialState = {
  subdomain: '',
  availability: null,
  status: 'idle',
  error: null,
};

export const getSubdomainAvailability = createAsyncThunk(
  'Subdomain/checkSubdomainAvailability',
  async (subdomainObj) => {
    const { subdomainJson, subdomainName } = subdomainObj;
    const { available } = await subdomainService.getSubdomainAvailability(
      subdomainJson
    );

    return { subdomainName, available };
  }
);

const subdomainSlice = createSlice({
  name: 'subdomain',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSubdomainAvailability.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSubdomainAvailability.fulfilled, (state, action) => {
        const subdomainObj = action.payload;

        state.status = 'succeeded';
        state.subdomain = subdomainObj.subdomainName;
        state.availability = subdomainObj.available;
      })
      .addCase(getSubdomainAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error(action.error);

        console.log(action.error);
      });
  },
});

export const selectSubdomain = (state) => state.Subdomain.subdomain;
export const selectSubdomainAvailability = (state) => state.Subdomain.availability;
export const selectSubdomainStatus = (state) => state.Subdomain.status;

export const { setSubdomainStatus } = subdomainSlice.actions;

export default subdomainSlice.reducer;
