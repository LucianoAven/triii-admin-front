import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  import SubscriptionService from 'services/subscription';
  
  const SubscriptionAdapter = createEntityAdapter({});
  
  const initialState = SubscriptionAdapter.getInitialState({
    status: 'idle',
    data: {
      title: 'sales',
      plan: 'Basic',
      daysRemaining: 0,
      state: 'In trial',
    },
  });
  
  export const getSubscription = createAsyncThunk<any, void>(
    'Subscription/getSubscription',
    async () => {
      const Subscriptiones = await SubscriptionService.getWorkspaces();
  
      return Subscriptiones;
    }
  );
  
  export const subscriptionSlice = createSlice({
    name: 'Subscriptiones',
    initialState,
    reducers: {
      upsertWorkspace: (state, action) => {
        SubscriptionAdapter.upsertOne(state, action.payload);
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getSubscription.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getSubscription.fulfilled, (state, action) => {
  
  
          state.status = 'succeeded';
        })
        .addCase(getSubscription.rejected, (state, action) => {
          state.status = 'failed';
        })
    },
  });
  
  // selectors
  
  // export const getWorkspacesError = (state) => state.Workspaces.error.Subscriptiones;
  
  //actions
  export const { upsertWorkspace } = subscriptionSlice.actions;
  
  export default subscriptionSlice.reducer;
  