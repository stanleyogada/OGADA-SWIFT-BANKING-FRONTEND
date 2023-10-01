import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";

import { QUERY_KEYS } from "@constants/services";
import { getBankVerification, getBanks } from "@services/banks";

import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import ModalHeader from "@components/Modal/ModalHeader";
import TransferPinModal from "@components/TransferPinModal";
import { postSendMoneyBank } from "@services/sendMoney";
import SendMoneyModal from "@components/SendMoneyModal";
import useSendMoneyBeneficiaries from "@hooks/useSendMoneyBeneficiaries";

const useSendMoneyBank = () => {
  const { handleGetAllBeneficiaries, handleSetBeneficiary } = useSendMoneyBeneficiaries();
  const { handleAdd } = useModalConsumer();
  const [currentBankCode, handleCurrentBankCodeChange] = useState<number | null>(null);
  const { handleSubmit, register, reset, getValues, watch, setValue } = useForm();
  const [transferPin, setTransferPin] = useState("");

  useEffect(() => {
    watch("recipientAccountNumber");
  }, []);

  const recipientAccountNumber = useMemo(
    () => getValues("recipientAccountNumber"),
    [getValues("recipientAccountNumber")]
  );

  const enabledVerifyAccount = useMemo(() => {
    if (!/^[0-9]{10,10}$/.test(recipientAccountNumber)) return false;
    if (currentBankCode === null) return false;

    return true;
  }, [recipientAccountNumber, currentBankCode]);

  const verifyAccount = useQuery(
    [QUERY_KEYS.getBankVerify, enabledVerifyAccount],
    () => getBankVerification(recipientAccountNumber, currentBankCode as number),
    {
      enabled: enabledVerifyAccount,
      retry: false,
    }
  );

  const banks = useQuery(QUERY_KEYS.getAllBanks, getBanks, {
    retry: false,
  });

  // const handleCurrentBankCodeChange = (code: typeof currentBankCode) => {
  //   setCurrentBankCode(bankCode);
  // }

  const sendMoneyMutation = useMutation(postSendMoneyBank, {
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

        handleSetBeneficiary("bank", {
          accountNumber: recipientAccountNumber,
          fullName: verifyAccount.data?.accountName,
          bankName: currentBank?.name,
          bankCode: currentBank?.code as number,
          avatar: currentBank?.logo as string,
          type: "bank",
        });
      }, 5);
    },

    onError: () => {
      handleAdd({
        heading: <ModalHeader text="Transfer failed!" />,
        body: <SendMoneyModal hasError />,
        onClose: () => setTransferPin(""),
      });
    },
  });

  const handleTransferPinChange = (value: string) => {
    console.log("handleTransferPinChange", value);

    setTransferPin(value);
  };

  const handleSendMoney = () =>
    handleSubmit(({ amount, remark, recipientAccountNumber, bankAccountFullName, bankName }) => {
      if (!transferPin && process.env.NODE_ENV !== "test") {
        return handleAdd({
          heading: <ModalHeader text="Transfer Pin" />,
          body: <TransferPinModal onComplete={handleTransferPinChange} />,
        });
      }

      sendMoneyMutation.mutate({
        amount,
        remark,
        senderAccountType: "NORMAL",
        transferPin: transferPin,
        bankAccountFullName,
        bankAccountNumber: recipientAccountNumber,
        bankName,
      });
    });

  const currentBank = useMemo(() => {
    if (currentBankCode === null) return null;
    if (banks.isLoading || !banks.data || banks.isError) return null;

    return banks.data.find((bank) => bank.code === currentBankCode);
  }, [currentBankCode, banks.data, banks.isLoading, banks.isError]);

  const recipientAccountNumberInputIsDisabled = useMemo(() => {
    if (currentBank) return false;

    return true;
  }, [currentBank]);

  useEffect(() => {
    if (!recipientAccountNumberInputIsDisabled) return;

    setValue("recipientAccountNumber", "");
  }, [recipientAccountNumberInputIsDisabled]);

  const isRecipientFound = useMemo(() => {
    if (!enabledVerifyAccount) return false;
    if (verifyAccount.isLoading || verifyAccount.isError || !verifyAccount.data) return false;

    return true;
  }, [verifyAccount.data, verifyAccount.isLoading, verifyAccount.isError, enabledVerifyAccount]);

  const isSendMoneyButtonDisabled = useMemo(() => {
    if (!enabledVerifyAccount) return true;
    if (!isRecipientFound) return true;
    if (sendMoneyMutation.isLoading) return true;

    return false;
  }, [enabledVerifyAccount, isRecipientFound, sendMoneyMutation.isLoading]);

  const handleBeneficiaryClick = (beneficiaryAccountNumber: string) => {
    const beneficiary = handleGetAllBeneficiaries("bank").find(
      (beneficiary) => beneficiary.accountNumber === beneficiaryAccountNumber
    );

    if (!beneficiary) return;

    setValue("recipientAccountNumber", beneficiary?.accountNumber);
    handleCurrentBankCodeChange(beneficiary.bankCode as number);
  };

  const showBeneficiaries = useMemo(() => {
    if (recipientAccountNumber) return false;

    return true;
  }, [recipientAccountNumber]);

  return {
    beneficiaries: handleGetAllBeneficiaries("bank"),
    showBeneficiaries,
    verifyAccount,
    banks,
    currentBank,
    recipientAccountNumberInputIsDisabled,
    isRecipientFound,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    handleCurrentBankCodeChange,
    register,
    handleSendMoney,
    handleBeneficiaryClick,
  };
};

export default useSendMoneyBank;
