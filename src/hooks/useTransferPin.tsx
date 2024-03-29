import { useMemo, useState } from "react";

import ModalHeader from "@components/Modal/ModalHeader";
import TransferPinModal from "@components/TransferPinModal";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

const useTransferPin = () => {
  const { handleAdd } = useModalConsumer();
  const [transferPin, setTransferPin] = useState("");
  // const [onComplete, setOnComplete] = useState<() => void | null>(null);

  const handleTransferPinChange = (value: string) => {
    setTransferPin(value);
  };

  const handleClearTransferPin = () => setTransferPin("");

  const hasTransferPin = useMemo(() => !transferPin && process.env.NODE_ENV !== "test", [transferPin]);

  const handlePushTransferPinModal = (cb: (pin: string) => void) => {
    handleAdd({
      heading: <ModalHeader text="Transfer Pin" />,
      body: <TransferPinModal onComplete={handleTransferPinChange} cb={cb} />,
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
