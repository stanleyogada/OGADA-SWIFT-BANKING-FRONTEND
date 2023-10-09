import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const useCurrentBundleAmount = (form: ReturnType<typeof useForm>) => {
  const { watch, setValue } = form;
  const [currentBundleAmount, setCurrentBundleAmount] = useState<string>("");
  const amountValue = watch("amount");

  useEffect(() => {
    if (!currentBundleAmount) {
      setValue("amount", "");

      return;
    }

    setValue("amount", currentBundleAmount);
  }, [currentBundleAmount]);

  const isPayButtonDisabled = useMemo(() => {
    if (!amountValue) return true;

    return false;
  }, [amountValue]);

  const handleBundleClick = (amount: string) => {
    setCurrentBundleAmount(currentBundleAmount === amount ? "" : amount);
  };

  return {
    currentBundleAmount,
    isPayButtonDisabled,
    handleBundleClick,
  };
};

export default useCurrentBundleAmount;
