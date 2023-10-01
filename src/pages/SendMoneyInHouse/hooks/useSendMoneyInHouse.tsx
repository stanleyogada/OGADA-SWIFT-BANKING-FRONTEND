import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getUserByPhone } from "@services/users";
import { postSendMoneyInHouse } from "@services/sendMoney";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import SendMoneyModal from "@components/SendMoneyModal";
import ModalHeader from "@components/Modal/ModalHeader";
import TransferPinModal from "@components/TransferPinModal";
import useCurrentUser from "@hooks/useCurrentUser";
import useSendMoneyBeneficiaries from "@hooks/useSendMoneyBeneficiaries";

import type { AxiosError } from "axios";

const useSendMoneyInHouse = () => {
  const { handleGetAllBeneficiaries, handleSetBeneficiary } = useSendMoneyBeneficiaries();
  const { handleAdd } = useModalConsumer();
  const { handleSubmit, register, reset, getValues, watch, setValue } = useForm();
  const [transferPin, setTransferPin] = useState("");

  useEffect(() => {
    watch("recipientAccountNumber");
  }, []);

  const recipientAccountNumber = useMemo(
    () => getValues("recipientAccountNumber"),
    [getValues("recipientAccountNumber")]
  );

  const enabledGetUser = useMemo(() => {
    if (!recipientAccountNumber) return false;
    if (recipientAccountNumber?.length !== 10) return false;
    if (/^[0-9]{10,10}$/.test(recipientAccountNumber) === false) return false;

    return true;
  }, [recipientAccountNumber]);

  const recipient = useQuery(
    [QUERY_KEYS.getUserByPhone, enabledGetUser],
    () => getUserByPhone(recipientAccountNumber),
    {
      enabled: enabledGetUser,
      retry: false,
    }
  );

  const sendMoneyMutation = useMutation(postSendMoneyInHouse, {
    onSuccess: () => {
      // Add a delay to ensure the submit button is still disabled (for testing)
      setTimeout(() => {
        reset();
        setValue("recipientAccountNumber", ""); // Have no idea why the input value is not reset
        handleAdd({
          heading: <ModalHeader text="Transfer successful!" />,
          body: <SendMoneyModal />,
          onClose: () => window.location.reload(),
        });

        handleSetBeneficiary("in-house", {
          accountNumber: recipient.data?.phone,
          avatar: recipient.data?.avatar,
          fullName: recipient.data?.fullName,
          type: "in-house",
        });
      }, 5);
    },
  });

  const errorMessage = useMemo(() => {
    if (!sendMoneyMutation.isError || !sendMoneyMutation.error) return null;

    let error = (sendMoneyMutation.error as AxiosError).response?.data as { message: string };
    return error.message;
  }, [sendMoneyMutation.isError, sendMoneyMutation.error]);

  useEffect(() => {
    if (!errorMessage) return;

    handleAdd({
      heading: <ModalHeader text={`Transfer failed! ${errorMessage}`} />,
      body: <SendMoneyModal hasError />,
      onClose: () => setTransferPin(""),
    });
  }, [errorMessage]);

  const handleTransferPinChange = (value: string) => {
    setTransferPin(value);
  };

  const handleSendMoney = () =>
    handleSubmit(({ amount, remark, recipientAccountNumber }) => {
      if (!transferPin && process.env.NODE_ENV !== "test") {
        return handleAdd({
          heading: <ModalHeader text="Transfer Pin" />,
          body: <TransferPinModal onComplete={handleTransferPinChange} />,
        });
      }

      sendMoneyMutation.mutate({
        amount,
        remark,
        receiverAccountNumber: recipientAccountNumber,
        senderAccountType: "NORMAL",
        transferPin: transferPin,
      });
    });

  const isSendMoneyButtonDisabled = useMemo(() => {
    // if (!currentUser) return true;
    if (!enabledGetUser) return true;
    if (recipient.isLoading || recipient.isError || !recipient.data) return true;
    if (sendMoneyMutation.isLoading) return true;

    return false;
  }, [
    // currentUser,
    enabledGetUser,
    recipient.data,
    recipient.isLoading,
    recipient.isError,
    sendMoneyMutation.isLoading,
  ]);

  const isRecipientFound = useMemo(() => {
    if (!enabledGetUser) return false;
    if (recipient.isLoading || recipient.isError || !recipient.data) return false;

    return true;
  }, [recipient.data, recipient.isLoading, recipient.isError, enabledGetUser]);

  const handleBeneficiaryClick = (beneficiaryAccountNumber: string) => {
    setValue("recipientAccountNumber", beneficiaryAccountNumber);
  };

  const showBeneficiaries = useMemo(() => {
    if (recipientAccountNumber) return false;

    return true;
  }, [recipientAccountNumber]);

  return {
    beneficiaries: handleGetAllBeneficiaries("in-house"),
    recipient,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    isRecipientFound,
    showBeneficiaries,
    handleSendMoney,
    register,
    handleBeneficiaryClick,
  };
};

export default useSendMoneyInHouse;
