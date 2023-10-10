import { useMemo, useState } from "react";

import ModalHeader from "@components/Modal/ModalHeader";
import TransferPinModal from "@components/TransferPinModal";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

const useTransferPin = () => {
  const { handleAdd } = useModalConsumer();
  const [transferPin, setTransferPin] = useState("");

  const handleTransferPinChange = (value: string) => {
    setTransferPin(value);
  };

  const handleClearTransferPin = () => setTransferPin("");

  const hasTransferPin = useMemo(() => !transferPin && process.env.NODE_ENV !== "test", [transferPin]);

  const handlePushTransferPinModal = () => {
    handleAdd({
      heading: <ModalHeader text="Transfer Pin" />,
      body: <TransferPinModal onComplete={handleTransferPinChange} />,
    });
  };

  return {
    transferPin,
    hasTransferPin,
    setTransferPin,
    handlePushTransferPinModal,
    handleClearTransferPin,
  };
};

export default useTransferPin;
