import { Accounts } from '@trii/types';
import type { Status, Error } from 'ReduxToolkit/features/definitions';

interface IuserStatus {
  user: Status;
  nameChange: Status;
  cancelDeletionStatus: Status;
  deleteUser: Status;
}

interface IuserError {
  user: Error;
  nameChange: Error;
  cancelDeletionStatus: Error;
  deleteUser: Error;
}

export interface IuserState {
  user: Accounts.IPrincipalAccount;
  status: IuserStatus;
  error: IuserError;
}
