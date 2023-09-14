import { useEffect, useState } from "react";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import useCurrentUser from "@hooks/useCurrentUser";
import NetworkErrorModal from "@components/NetworkErrorModal";
import ModalHeader from "@components/Modal/ModalHeader";

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
        heading: <ModalHeader text="Network Error ⚠️ ✌🏼" />,
        body: <NetworkErrorModal />,
        isPersistent: true,
      });
    }
  }, [isMixedContentError]);
};

export default useNetworkErrorModal;
