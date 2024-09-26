/* eslint-disable default-case */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Pool from 'authentication/authenticationConfig';
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';
import Pool from '../../auth/UserPool';

const initialState = {
  session: {},
  status: 'idle',
  error: null,
};

export const setSession = createAsyncThunk('Session/setSession', async () => {
  return await new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();

    user
      ? user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(checkSessionValidity(user, session));
          }
        })
      : reject(false);
  });
});

const sessionSlice = createSlice({
  name: 'Session',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setSession.fulfilled, (state, action) => {
        const session = action.payload;
        console.log('success fetching session: ', action.payload);

        state.status = 'succeeded';
        state.session = session;
        if (window.location.pathname === '/signin') {
          window.location.href = '/';
        } //  if (window.location.host === 'account.trii.app') {
        //   window.location.href = 'https://trii.app';
        // }
      })
      .addCase(setSession.rejected, (state, action) => {
        console.log('error fetching session');

        state.status = 'failed';
        state.error = action.error.message;
        state.session = {};
        console.log('location: ', action.payload);

        if (
          window.location.pathname !== '/signin' &&
          window.location.pathname !== '/signup' &&
          window.location.pathname !== '/signuptest' &&
          window.location.pathname !== '/forgotpassword'
        ) {
          window.location.href = '/signin' + window.location.search;
        }
      });
  },
});

export const getSession = async () => {
  return await new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();

    user
      ? user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(checkSessionValidity(user, session));
          }
        })
      : reject(false);
  });
};

const checkSessionValidity = (user, session) => {
  if (session.isValid()) {
    return session;
  } else {
    return refreshSession(user, session);
  }
};

const refreshSession = async (user, session) => {
  const refreshToken = new CognitoRefreshToken({
    RefreshToken: session.getRefreshToken().getToken(),
  });

  return await new Promise((resolve, reject) => {
    user.refreshSession(refreshToken, (err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
};

export const logout = () => {
  const user = Pool.getCurrentUser();
  console.log('user', user);
  if (user) {
    user.signOut(redirect);
  }
};
export const redirect = async () => {
  window.location.href = `${
    window.location.protocol
  }//${window.location.host.replace('account.', '')}`;
};
//selectors
export const selectSession = (state) => state.Session.session;
export const getSessionStatus = (state) => state.Session.status;
export const getSessionError = (state) => state.Session.error;

export default sessionSlice.reducer;
