import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

const AppContainer = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
