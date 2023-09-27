import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import { useEffect, useState } from "react";

const useTransferPinModal = (onComplete: (pin: string) => void) => {
  const [transferPin, setTransferPin] = useState("");

  const { handleRemove } = useModalConsumer();

  const handleNumberClick = (number: string) => {
    const newPin = transferPin + number;
    setTransferPin(newPin);
  };

  const handleCloseModal = () => handleRemove();
  const handleClear = () => setTransferPin("");

  const handleDelete = () => {
    const newPin = transferPin.slice(0, -1);
    setTransferPin(newPin);
  };

  useEffect(() => {
    if (transferPin.length === 4) {
      onComplete(transferPin);
      handleRemove();
    }
  }, [transferPin]);

  return {
    transferPin,
    handleNumberClick,
    handleCloseModal,
    handleClear,
    handleDelete,
  };
};

export default useTransferPinModal;
