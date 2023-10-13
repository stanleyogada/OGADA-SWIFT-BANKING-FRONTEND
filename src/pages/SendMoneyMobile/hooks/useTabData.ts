import { useForm } from "react-hook-form";

import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { TUserAccountType } from "@services/users/types";
import useTransferPin from "@hooks/useTransferPin";

import useSendMoneyMobileMutation from "./useSendMoneyMobileMutation";
import useToaster from "./useToaster";

type TProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  accountType: TUserAccountType;
  isAirtime: boolean;
};

const useTabData = ({ currentNetwork, accountType, isAirtime }: TProps) => {
  const form = useForm<{
    phoneNumber: string;
    amount: string;
  }>();
  const { handleSubmit: _handleSubmit } = form;
  const { transferPin, hasTransferPin, handlePushTransferPinModal, handleClearTransferPin } = useTransferPin();
  const mutation = useSendMoneyMobileMutation(isAirtime);

  useToaster({
    mutation: {
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      error: mutation.error,
    },
    onErrorClose: () => handleClearTransferPin(),
    onSuccessClose: () => window.location.reload(),
  });

  const handleSubmit = () =>
    _handleSubmit((data) => {
      if (hasTransferPin) {
        return handlePushTransferPinModal();
      }

      mutation.handleMutate({
        accountType,
        transferPin,
        operator: currentNetwork.name,
        phoneNumber: data.phoneNumber,
        amount: +data.amount,
      });
    });

  return {
    form,
    mutation: {
      isLoading: mutation.isLoading,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
    },

    handleSubmit,
    handleClearTransferPin,
  };
};

export default useTabData;
