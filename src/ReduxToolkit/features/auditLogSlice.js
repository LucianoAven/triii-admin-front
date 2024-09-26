import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logs from '../../services/logs';

const initialState = {
  logList: [],
  status: 'idle',
  error: null,
  date: { initDate: '', endDate: '' },
  type: '',
};

export const setLogs = createAsyncThunk('Logs/setLogs', async (dateData) => {
  const log = await logs.getLogs(dateData);

  return log;
});

export const auditLogSlice = createSlice({
  name: 'Logs',
  initialState,
  reducers: {
    setLogDateFilter: (state, action) => {
      state.date = { ...state.value, ...action.payload };
      // console.log("stateDate", state.date);
    },
    LogTypeFilter: (state, action) => {
      // state.type = { ...action.payload };
      state.type = Object.values(action.payload).join('');

      // console.log("stateDate", state.type);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setLogs.pending, (state, action) => {
        // console.log('loading log');
        state.logList = [];

        state.status = 'loading';
      })
      .addCase(setLogs.fulfilled, (state, action) => {
        // console.log('success fetching log: ', action.payload);
        state.status = 'succeeded';
        state.logList = action.payload;
      })
      .addCase(setLogs.rejected, (state, action) => {
        // console.log('erorr fetching log: ', action.payload);

        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// selectors
export const selectLogs = (state) => state.Logs.logList;
export const LogsTypeFilterSelector = (state) => state.Logs.type;
export const LogsinitDateFilterSelector = (state) => state.Logs.date.initDate;
export const LogsEndDateFilterSelector = (state) => state.Logs.date.endDate;
export const getLogsStatus = (state) => state.Logs.status;
export const getLogsError = (state) => state.Logs.error;

export const { setLogDateFilter, LogTypeFilter } = auditLogSlice.actions;

export default auditLogSlice.reducer;
