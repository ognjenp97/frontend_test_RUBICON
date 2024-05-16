export const SET_DATA = "SET_DATA";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

interface SetDataAction {
  type: typeof SET_DATA;
  payload: any;
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  payload: string;
}

export type ActionTypes = SetDataAction | SetSearchTermAction;
