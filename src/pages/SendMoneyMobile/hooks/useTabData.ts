import { useForm } from "react-hook-form";

import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { TUserAccountType } from "@services/users/types";
import useTransferPin from "@hooks/useTransferPin";

import useSendMoneyMobileMutation from "./useSendMoneyMobileMutation";

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
    },

    handleSubmit,
    handleClearTransferPin,
  };
};

export default useTabData;
