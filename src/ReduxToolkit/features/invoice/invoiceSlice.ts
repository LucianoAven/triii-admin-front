import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import subscriptionService from 'services/subscriptions';
import subscriptionService from 'services/subscription'

const subscriptionAdapter = createEntityAdapter({});

const initialState = subscriptionAdapter.getInitialState({
  subscription: {
    expirationDate: 0,
    paymentDay: 0,
    state: 'pending',
    period: 0,
    amount: 0,
  },
  status: 'idle'
});

export const getsubscriptions = createAsyncThunk<any, void>(
  'subscriptions/getsubscriptions',
  async () => {
    const subscriptions = await subscriptionService.getsubscriptions();

    return subscriptions;
  }
);


export const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {

    upsertWorkspace: (state, action) => {
      subscriptionAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getsubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getsubscriptions.fulfilled, (state, action) => {
        const subscriptions = action.payload;

        state.status = 'succeeded';
        subscriptionAdapter.upsertMany(state, subscriptions);
      })
      .addCase(getsubscriptions.rejected, (state, action) => {
        // const error = action.error.message;

        // state.error = error;
        state.status = 'failed';
      })     
  },
});


//actions
export const { upsertWorkspace } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
