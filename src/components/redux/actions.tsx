import { SET_DATA, SET_SEARCH_TERM } from "./types.tsx";
import { ActionTypes } from "./types.tsx";

export const setData = (data: any[]): ActionTypes => ({
  type: SET_DATA,
  payload: data,
});

export const setSearchTerm = (term: string): ActionTypes => ({
  type: SET_SEARCH_TERM,
  payload: term,
});
