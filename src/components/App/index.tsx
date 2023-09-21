import { RouterProvider } from "react-router-dom";

import SplashScreen from "@components/SplashScreen";
import useNetworkErrorModal from "@hooks/useNetworkErrorModal";

import useSplash from "./hooks/useSplash";
import ROUTER from "./router";

function App() {
  const { isAppLoading } = useSplash();
  useNetworkErrorModal();

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return <RouterProvider router={ROUTER} />;
}

export default App;
