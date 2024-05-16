import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./components/redux/store.tsx";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
