import type { Status, Error } from 'ReduxToolkit/features/definitions';

interface Istatus {
  workspaces: Status;
  workspacePost: Status;
}

interface Ierror {
  workspaces: Error;
  workspacePost: Error;
}

export interface IworkspaceState {
  entities: any;
  ids: any;
  status: Istatus;
  error: Ierror;
}
