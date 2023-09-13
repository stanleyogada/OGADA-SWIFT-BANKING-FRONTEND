import { useContext } from "react";
import ModalContext from "../ModalContext";

const useModalConsumer = () => {
  const { handleAdd, handleRemove } = useContext(ModalContext);

  return {
    handleAdd,
    handleRemove,
  };
};

export default useModalConsumer;
