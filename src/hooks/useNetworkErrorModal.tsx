import { NetworkErrorModalBody, NetworkErrorModalHeader } from "@components/NetworkErrorModal";
import { useEffect, useState } from "react";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import useCurrentUser from "@hooks/useCurrentUser";

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
        isPersistent: true,
      });
    }
  }, [isMixedContentError]);
};

export default useNetworkErrorModal;
