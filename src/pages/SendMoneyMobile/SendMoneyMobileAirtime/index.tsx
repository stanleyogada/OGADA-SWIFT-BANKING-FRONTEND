import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";

import NetworkSelector from "../NetworkSelector";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import { useEffect, useMemo, useState } from "react";

type TSendMoneyMobileAirtimeProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useSendMoneyMobileAirtime = () => {
  const form = useForm();

  return {
    form,
  };
};

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

const SendMoneyMobileAirtime = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileAirtimeProps) => {
  const { form } = useSendMoneyMobileAirtime();
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount(form);
  const { register } = form;

  return (
    <div>
      <Tag />

      <Input
        title="Phone"
        type="text"
        placeholder="Phone number"
        maxLength={11}
        rest={{
          ...register("phoneNumber"),
        }}
      />

      <NetworkSelector
        currentNetwork={currentNetwork}
        isDropRestNetworks={isDropRestNetworks}
        restNetworks={restNetworks}
        onCurrentNetworkClick={handleCurrentNetworkClick}
        onCurrentNetworkChange={handleCurrentNetworkChange}
      />

      <Input
        type="text"
        placeholder="Amount"
        rest={{
          ...register("amount", {
            min: 2,
          }),
        }}
      />

      <div>
        {SEND_MONEY_MOBILE_BUNDLES.slice(0, 6).map((bundle) => {
          return (
            <div
              key={bundle.amount}
              data-testid="bundle"
              className={currentBundleAmount === bundle.amount.toString() ? "active" : ""}
              onClick={() => handleBundleClick(bundle.amount.toString())}
            >
              <div>{bundle.amount}</div>
            </div>
          );
        })}
      </div>

      <button disabled={isPayButtonDisabled}>Pay</button>
    </div>
  );
};

export default SendMoneyMobileAirtime;
