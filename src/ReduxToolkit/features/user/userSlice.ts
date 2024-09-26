import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from 'services/users';
import { IuserState } from './definitions';
import { Accounts } from '@trii/types';

const initialState: IuserState = {
  user: {
    id: '',
    uid: '',
    name: '',
    email: '',
    status: Accounts.Account_Status.Normal,
  },
  status: {
    user: 'idle',
    nameChange: 'idle',
    cancelDeletionStatus: 'idle',
    deleteUser: 'idle',
  },
  error: {
    user: null,
    nameChange: null,
    cancelDeletionStatus: null,
    deleteUser: null,
  },
};

export const setUser = createAsyncThunk('User/setUser', async () => {
  const user = await usersService.getUser();

  return user;
});

export const updateUserName = createAsyncThunk(
  'User/updateUserName',
  async (userNameJson) => {
    const user = await usersService.updateUser(userNameJson);

    return user;
  }
);

export const cancelDeletionStatus = createAsyncThunk(
  'User/cancelDeletionStatus',
  async (statusJson: { status: string }) => {
    const user = await usersService.updateUser(statusJson);

    return user;
  }
);

export const deleteUser = createAsyncThunk('User/deleteUser', async () => {
  const user = await usersService.deleteUser();

  return user;
});

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = { ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setUser.pending, (state) => {
        state.status.user = 'loading';
      })
      .addCase(setUser.fulfilled, (state, action) => {
        const user = new Accounts.PrincipalAccount(action.payload);

        state.status.user = 'succeeded';
        state.user = user;
      })
      .addCase(setUser.rejected, (state, action) => {
        console.log('error fetching user: ', action.payload);

        state.status.user = 'failed';
        state.error.user = action.error.message;
      })
      .addCase(updateUserName.pending, (state) => {
        state.status.nameChange = 'loading';
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        const user = new Accounts.PrincipalAccount(action.payload);

        state.status.nameChange = 'succeeded';
        state.user = user;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        console.log(action.error.message);

        state.status.nameChange = 'failed';
        state.error.nameChange = action.error.message;
      })
      .addCase(cancelDeletionStatus.pending, (state) => {
        state.status.cancelDeletionStatus = 'loading';
      })
      .addCase(cancelDeletionStatus.fulfilled, (state, action) => {
        const user = new Accounts.PrincipalAccount(action.payload);

        state.status.cancelDeletionStatus = 'succeeded';
        state.user = user;
      })
      .addCase(cancelDeletionStatus.rejected, (state, action) => {
        console.log(action.error.message);

        state.status.cancelDeletionStatus = 'failed';
        state.error.cancelDeletionStatus = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status.deleteUser = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const user = new Accounts.PrincipalAccount(action.payload);

        state.status.deleteUser = 'succeeded';
        state.user = user;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log(action.error.message);

        state.status.deleteUser = 'failed';
        state.error.deleteUser = action.error.message;
      });
  },
});

// selectors
export const selectUser = (state) => state.User.user;
export const getUserStatus = (state) => state.User.status.user;
export const getUserError = (state) => state.User.error;
export const getDeleteUserStatus = (state) => state.User.status.deleteUser;

//actions
export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
