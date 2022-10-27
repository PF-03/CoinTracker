
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Context } from './Context';
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <Provider store={store}>
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </React.StrictMode>
  </Provider>
);
