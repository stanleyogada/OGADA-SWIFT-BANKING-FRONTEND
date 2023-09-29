import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getBankVerification, getBanks } from "@services/banks";
import { useForm } from "react-hook-form";

const useSendMoneyBank = () => {
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

  return {
    verifyAccount,
    banks,
    currentBankCode,
    currentBank,
    recipientAccountNumberInputIsDisabled,
    isRecipientFound,
    handleCurrentBankCodeChange,
    register,
  };
};

export default useSendMoneyBank;
