import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";

import NetworkSelector from "../NetworkSelector";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import { useEffect, useMemo, useState } from "react";

type TSendMoneyMobileDataProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useSendMoneyMobileData = () => {
  const { watch, setValue, register, handleSubmit: _handleSubmit } = useForm();
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
    register,
    handleSubmit: _handleSubmit,
  };
};

const SendMoneyMobileData = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileDataProps) => {
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick, register, handleSubmit } =
    useSendMoneyMobileData();

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

      <div>
        {SEND_MONEY_MOBILE_BUNDLES.map((bundle) => {
          return (
            <div
              key={bundle.amount}
              data-testid="bundle"
              onClick={() => handleBundleClick(bundle.amount.toString())}
              className={currentBundleAmount === bundle.amount.toString() ? "active" : ""}
            >
              <div>{bundle.amount}</div>
              <div>{bundle.data}</div>
              <div>{bundle.validity}</div>

              {bundle.tag && <div data-testid="bundle-tag">{bundle.tag}</div>}
            </div>
          );
        })}
      </div>

      <button disabled={isPayButtonDisabled}>Pay</button>
    </div>
  );
};

export default SendMoneyMobileData;
