import React from "react";

import initializeAxios from "apis/axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./common/i18n";
// eslint-disable-next-line import/order
import App from "./App";
import "./index.css";

// ... [keep the rest the same]
initializeAxios();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Add it right above the App */}
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
