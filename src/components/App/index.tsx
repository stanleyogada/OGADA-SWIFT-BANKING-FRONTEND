import { RouterProvider } from "react-router-dom";

import useSplash from "./hooks/useSplash";
import ROUTER from "./router";
import SplashScreen from "../SplashScreen/index";

function App() {
  const { isAppLoading } = useSplash();

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return <RouterProvider router={ROUTER} />;
}

export default App;
