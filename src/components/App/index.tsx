import { RouterProvider } from "react-router-dom";
import SplashScreen from "../SplashScreen/Index";
import useSplash from "./hooks/useSplash";
import ROUTER from "./router";

function App() {
  const { isAppLoading } = useSplash();

  if (isAppLoading) return <SplashScreen />;

  return <RouterProvider router={ROUTER} />;
}

export default App;
