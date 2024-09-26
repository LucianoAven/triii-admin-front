import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import workspacesService from 'services/workspaces';
import { IworkspaceState } from './definitions';
import { Spaces } from '@trii/types';

const workspaceAdapter = createEntityAdapter({});

const initialState: IworkspaceState = workspaceAdapter.getInitialState({
  status: {
    workspaces: 'idle',
    workspacePost: 'idle',
  },
  error: {
    workspaces: null,
    workspacePost: null,
  },
});

export const getWorkspaces = createAsyncThunk<any, void>(
  'Workspaces/getWorkspaces',
  async () => {
    const workspaces = await workspacesService.getWorkspaces();

    return workspaces;
  }
);

export const addWorkspace = createAsyncThunk<Spaces.ISpace, void>(
  'Workspaces/addWorkspace',
  async (workspaceJson) => {
    const newWorkspace = await workspacesService.postWorkspace(workspaceJson);

    return newWorkspace;
  }
);

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setWorkspacePostStatus: (state, action) => {
      state.status.workspacePost = action.payload;
    },
    upsertWorkspace: (state, action) => {
      workspaceAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWorkspaces.pending, (state) => {
        state.status.workspaces = 'loading';
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        const workspaces = action.payload;

        state.status.workspaces = 'succeeded';
        workspaceAdapter.upsertMany(state, workspaces);
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        const error = action.error.message;
        console.log(error);

        state.error.workspaces = error;
        state.status.workspaces = 'failed';
      })
      .addCase(addWorkspace.pending, (state) => {
        state.status.workspacePost = 'loading';
      })
      .addCase(addWorkspace.fulfilled, (state, action) => {
        const newWorkspace = action.payload;

        state.status.workspacePost = 'succeeded';
        workspaceAdapter.upsertOne(state, newWorkspace);
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        const error = action.error.message;

        state.status.workspacePost = 'failed';
        state.error.workspacePost = error;
      });
  },
});

// selectors
export const { selectAll: selectWorkspacesList, selectById: selectWorkspace } =
  workspaceAdapter.getSelectors((state: any) => state.Workspaces);
export const getWorkspacesStatus = (state) => state.Workspaces.status.workspaces;
export const getWorkspacePostStatus = (state) =>
  state.Workspaces.status.workspacePost;
export const getWorkspacesError = (state) => state.Workspaces.error.workspaces;

//actions
export const { setWorkspacePostStatus, upsertWorkspace } = workspacesSlice.actions;

export default workspacesSlice.reducer;
