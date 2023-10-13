import { useEffect, useMemo } from "react";

import ModalHeader from "@components/Modal/ModalHeader";
import SendMoneyModal from "@components/SendMoney/SendMoneyModal";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

import type { AxiosError } from "axios";

type TProps = {
  mutation: {
    isSuccess: boolean;
    isError: boolean;
    error: AxiosError | null;
  };
  onErrorClose: () => void;
  onSuccessClose: () => void;
};

const useToaster = ({ mutation, onErrorClose, onSuccessClose }: TProps) => {
  const { handleAdd } = useModalConsumer();

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
      // handleFormReset();
      // setValue("recipientAccountNumber", ""); // Have no idea why the input value is not reset
      handleAdd({
        heading: <ModalHeader text="Transfer successful!" />,
        body: <SendMoneyModal />,
        onClose: onSuccessClose,
      });

      // handleSetBeneficiary("in-house", {
      //   accountNumber: recipient.data?.phone,
      //   avatar: recipient.data?.avatar,
      //   fullName: recipient.data?.fullName,
      //   type: "in-house",
      // });
    }, 5);
  }, [mutation.isSuccess]);
};

export default useToaster;
