import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./main.css";
import SplashScreen from "./components/SplashScreen/Index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
