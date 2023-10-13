import { useForm } from "react-hook-form";

import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { TUserAccountType } from "@services/users/types";
import useTransferPin from "@hooks/useTransferPin";

import useSendMoneyMobileMutation from "./useSendMoneyMobileMutation";
import useToaster from "./useToaster";
import useSendMoneyBeneficiaries from "@hooks/useSendMoneyBeneficiaries";
import { useMemo } from "react";

type TProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  accountType: TUserAccountType;
  isAirtime: boolean;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useTabData = ({ currentNetwork, accountType, isAirtime, handleCurrentNetworkChange }: TProps) => {
  const form = useForm<{
    phoneNumber: string;
    amount: string;
  }>();
  const { handleSubmit: _handleSubmit } = form;
  const { transferPin, hasTransferPin, handlePushTransferPinModal, handleClearTransferPin } = useTransferPin();
  const mutation = useSendMoneyMobileMutation(isAirtime);
  const { handleGetAllBeneficiaries, handleSetBeneficiary } = useSendMoneyBeneficiaries();

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

  const phoneNumber = form.watch("phoneNumber");

  const showBeneficiaries = useMemo(() => {
    // if (phoneNumber) return false;

    return true;
  }, [phoneNumber]);

  const handleBeneficiaryClick = (_: unknown, beneficiaryPhoneNumber?: string) => {
    const beneficiary = handleGetAllBeneficiaries("bank").find(
      (beneficiary) => beneficiary.phoneNumber === beneficiaryPhoneNumber
    );
    // if (!beneficiary) return;
    // form.setValue("phoneNumber", beneficiaryPhoneNumber);
    // handleCurrentNetworkChange(beneficiary.operator as string);

    console.log({ beneficiary });
  };

  return {
    beneficiaries: handleGetAllBeneficiaries("mobile"),
    showBeneficiaries,
    form,
    mutation: {
      isLoading: mutation.isLoading,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
    },

    handleSubmit,
    handleClearTransferPin,
    handleBeneficiaryClick,
  };
};

export default useTabData;
