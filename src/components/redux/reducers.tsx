import { SET_DATA, SET_SEARCH_TERM } from "./types.tsx";
import { AppState } from "./state.tsx";
import { ActionTypes } from "./types.tsx";

const initialState: AppState = {
  data: [],
  searchTerm: "",
};

const rootReducer = (state = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
