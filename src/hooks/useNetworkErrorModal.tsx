import { useEffect, useState } from "react";

import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import { NetworkErrorModalHeader, NetworkErrorModalBody } from "@components/NetworkErrorModal";

import useCurrentUser from "./useCurrentUser";

const useNetworkErrorModal = () => {
  const { isError, error } = useCurrentUser();
  const [isMixedContentError, setIsMixedContentError] = useState(false);
  const { handleAdd } = useModalConsumer();

  useEffect(() => {
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

export default useNetworkErrorModal();
