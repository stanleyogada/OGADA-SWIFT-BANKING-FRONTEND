import { useEffect, useMemo } from "react";

import ModalHeader from "@components/Modal/ModalHeader";
import SendMoneyModal from "@components/SendMoney/SendMoneyModal";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

import type { AxiosError } from "axios";
import useSendMoneyBeneficiaries from "@hooks/useSendMoneyBeneficiaries";
import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

type TProps = {
  phoneNumber: string;
  currentNetwork: TSendMoneyMobileNetwork;
  mutation: {
    isSuccess: boolean;
    isError: boolean;
    error: AxiosError | null;
  };
  onErrorClose: () => void;
  onSuccessClose: () => void;
};

const useToaster = ({ phoneNumber, currentNetwork, mutation, onErrorClose, onSuccessClose }: TProps) => {
  const { handleAdd } = useModalConsumer();
  const { handleSetBeneficiary } = useSendMoneyBeneficiaries();

  const errorMessage = useMemo(() => {
    if (!mutation.isError || !mutation.error) return null;

    let error = (mutation.error as AxiosError).response?.data as { message: string };
    return error.message || mutation.error?.message;
  }, [mutation.isError, mutation.error]);

  useEffect(() => {
    if (!errorMessage) return;

    handleAdd({
      heading: <ModalHeader text={`Transfer failed! ${errorMessage}`} />,
      body: <SendMoneyModal hasError />,
      onClose: onErrorClose,
    });
  }, [errorMessage]);

  useEffect(() => {
    if (!mutation.isSuccess) return;

    setTimeout(() => {
      handleSetBeneficiary({
        phoneNumber,
        operator: currentNetwork.id,
        type: "mobile",
      });
      handleAdd({
        heading: <ModalHeader text="Transfer successful!" />,
        body: <SendMoneyModal />,
        onClose: onSuccessClose,
      });
    }, 5);
  }, [mutation.isSuccess]);
};

export default useToaster;
