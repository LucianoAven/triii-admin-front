import { configureStore } from '@reduxjs/toolkit';
import editWaAccountReducer from './features/WaAccountSlice';
import userReducer from './features/user/userSlice.ts';
import workspaceReducer from './features/workspace/workspaceSlice.ts';
import sessionReducer from './features/sessionSlice';
import auditLogReducer from './features/auditLogSlice';
import subdomainReducer from './features/subdomainSlice';
import iconNavReducer from './features/iconNavSlice';

import addressReducer from './features/address/addressSlice.ts';
import invoiceReducer from './features/invoice/invoiceSlice.ts';
import subscriptionReducer from './features/invoice/invoiceSlice.ts';

export const store = configureStore({
  reducer: {
    AccountWa: editWaAccountReducer,
    User: userReducer,
    Workspaces: workspaceReducer,
    Session: sessionReducer,
    Logs: auditLogReducer,
    Subdomain: subdomainReducer,
    iconNav: iconNavReducer,
    Address: addressReducer,
    Invoice: invoiceReducer,
    Subscription: subscriptionReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
