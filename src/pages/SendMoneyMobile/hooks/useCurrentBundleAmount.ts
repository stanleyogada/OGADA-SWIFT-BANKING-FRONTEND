import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type TProps = {
  form: ReturnType<typeof useForm>;
  handleClearTransferPin: () => void;
};

const useCurrentBundleAmount = ({ form, handleClearTransferPin }: TProps) => {
  const { watch, setValue } = form;
  const [currentBundleAmount, setCurrentBundleAmount] = useState<string>("");
  const amountValue = watch("amount");

  useEffect(() => {
    if (!currentBundleAmount) {
      setValue("amount", "");

      return;
    }

    setValue("amount", currentBundleAmount);
    handleClearTransferPin();
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
