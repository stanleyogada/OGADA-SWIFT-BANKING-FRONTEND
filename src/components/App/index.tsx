import { RouterProvider } from "react-router-dom";

import SplashScreen from "@components/SplashScreen";
import Modal from "@components/Modal";

import useSplash from "./hooks/useSplash";
import ROUTER from "./router";
// import useNetworkErrorModal from "@hooks/useNetworkErrorModal";
import { NetworkErrorModalBody, NetworkErrorModalHeader } from "@components/NetworkErrorModal";
import { useEffect, useState } from "react";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import useCurrentUser from "@hooks/useCurrentUser";

const useNetworkErrorModal = () => {
  const { isError, error } = useCurrentUser();
  const [isMixedContentError, setIsMixedContentError] = useState(false);
  const { handleAdd } = useModalConsumer();

  useEffect(() => {
    console.log("log setIsMixedContentError", [isError, error]);

    if (isError && error?.code === "ERR_NETWORK" && error?.message === "Network Error") {
      setIsMixedContentError(true);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isMixedContentError) {
      handleAdd({
        heading: <NetworkErrorModalHeader />,
        body: <NetworkErrorModalBody />,
      });
    }
  }, [isMixedContentError]);
};

function App() {
  const { isAppLoading } = useSplash();
  useNetworkErrorModal();

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Modal />

      <div data-app-container>
        <RouterProvider router={ROUTER} />;
      </div>
    </>
  );
}

export default App;
