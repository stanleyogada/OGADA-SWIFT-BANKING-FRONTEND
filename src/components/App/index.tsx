import { RouterProvider } from "react-router-dom";
import SplashScreen from "../SplashScreen/Index";
import { ROUTER } from "../../constants";
import useSplash from "./hooks/useSplash";

function App() {
  const { isAppLoading } = useSplash();

  if (isAppLoading) return <SplashScreen />;

  return <RouterProvider router={ROUTER} />;
}

export default App;
