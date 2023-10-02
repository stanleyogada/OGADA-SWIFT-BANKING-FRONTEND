import { useNavigate } from "react-router-dom";

import { CLIENT_ROUTES } from "@constants/routes";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import testLogger from "@utils/testLogger";

const useSendMoneyModal = () => {
  const navigate = useNavigate();
  const { handleRemove } = useModalConsumer();

  const handleSendMoneyAgain = () => {
    window.location.reload();
  };

  const handleContinueToHome = () => {
    navigate(CLIENT_ROUTES.home);
    handleRemove();
  };

  const handleFailTryAgain = () => {
    testLogger("Try again");
    handleRemove();
  };

  return {
    handleSendMoneyAgain,
    handleContinueToHome,
    handleFailTryAgain,
  };
};

export default useSendMoneyModal;
