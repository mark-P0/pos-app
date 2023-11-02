import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";
import "./assets/fonts.css";
import "./assets/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
