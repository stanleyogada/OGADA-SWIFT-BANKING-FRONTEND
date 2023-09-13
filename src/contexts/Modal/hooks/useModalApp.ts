import { useContext } from "react";
import ModalContext from "../ModalContext";

const useModalApp = () => {
  const { data, handleRemove } = useContext(ModalContext);

  return {
    data,
    handleRemove,
  };
};

export default useModalApp;
