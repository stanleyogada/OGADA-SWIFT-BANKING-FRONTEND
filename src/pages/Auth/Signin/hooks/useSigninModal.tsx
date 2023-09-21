import { useEffect } from "react";

import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import ModalHeader from "@components/Modal/ModalHeader";

import SigninModal from "../SigninModal";

const useSigninModal = () => {
  const { handleAdd } = useModalConsumer();

  useEffect(() => {
    handleAdd({
      heading: <ModalHeader text="How would you like to signin? 🤷🏽‍♂️" />,
      body: <SigninModal />,
    });
  }, []);
};

export default useSigninModal;
