import { createStore } from "redux";
import reducer from "./reducers.tsx";

const store = createStore(reducer);

export default store;
