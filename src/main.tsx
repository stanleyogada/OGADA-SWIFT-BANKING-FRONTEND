import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./main.css";
import WithSplashscreen from "./pages/splashscreen/withSplashscreen";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
   <WithSplashscreen> 
    <App/>
   </WithSplashscreen>
  </React.StrictMode>
);
