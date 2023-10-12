import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type TProps = {
  form: ReturnType<typeof useForm>;
  mutationIsLoading: boolean;
  handleClearTransferPin: () => void;
};

const useCurrentBundleAmount = ({ form, mutationIsLoading, handleClearTransferPin }: TProps) => {
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
    if (mutationIsLoading) return true;

    return false;
  }, [amountValue, mutationIsLoading]);

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
