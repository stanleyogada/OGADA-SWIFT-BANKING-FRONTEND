import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getBankVerification, getBanks } from "@services/banks";
import { useForm } from "react-hook-form";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import ModalHeader from "@components/Modal/ModalHeader";
import TransferPinModal from "@components/TransferPinModal";
import { postSendMoneyBank } from "@services/sendMoney";
import SendMoneyModal from "@components/SendMoneyModal";
import { TBeneficiary } from "@customTypes/Beneficiary";

const useSendMoneyBank = () => {
  const { handleAdd } = useModalConsumer();
  const [currentBankCode, handleCurrentBankCodeChange] = useState<number | null>(null);
  const { handleSubmit, register, reset, getValues, watch, setValue } = useForm();

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
      }, 5);
    },

    onError: () => {
      handleAdd({
        heading: <ModalHeader text="Transfer failed!" />,
        body: <SendMoneyModal hasError />,
      });
    },
  });

  const [transferPin, setTransferPin] = useState("");
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

      // const beneficiaries = getAllBeneficiaries();
      // const isBeneficiaryExist = beneficiaries.some(
      //   (beneficiary: TBeneficiary) => beneficiary.accountNumber === recipient.data?.phone
      // );

      // if (isBeneficiaryExist) return;

      // beneficiaries.push({
      //   type: "bank",
      //   fullName: bankAccountFullName,
      //   bankName,
      //   accountNumber: bankAccountNumber,
      // } as TBeneficiary);

      // localStorage.setItem(LOCAL_STORAGE_KEYS.saveBeneficiary, JSON.stringify(beneficiaries));
    });

  // const getAllBeneficiaries = (): TBeneficiary[] => {
  //   const beneficiaries = localStorage.getItem(LOCAL_STORAGE_KEYS.saveBeneficiary);
  //   if (beneficiaries) {
  //     return JSON.parse(beneficiaries).filter((beneficiary: TBeneficiary) => beneficiary.type === "in-house");
  //   }

  //   return [];
  // };

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

  return {
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
  };
};

export default useSendMoneyBank;
