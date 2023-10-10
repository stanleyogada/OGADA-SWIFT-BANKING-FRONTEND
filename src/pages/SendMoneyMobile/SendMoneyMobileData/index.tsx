import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import useTransferPin from "@hooks/useTransferPin";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { useState } from "react";
import { TUserAccountType } from "@services/users/types";

type TSendMoneyMobileDataProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useAccountType = () => {
  const [accountType, setAccountType] = useState<TUserAccountType>("NORMAL");

  const handleAccountTypeChange = (type: TUserAccountType) => {
    setAccountType(type);
  };

  const allAccountType = ["NORMAL", "CASHBACK"];

  return {
    allAccountType,
    accountType,
    handleAccountTypeChange,
  };
};

const useSendMoneyMobileData = ({
  currentNetwork,
  accountType,
}: {
  currentNetwork: TSendMoneyMobileNetwork;
  accountType: TUserAccountType;
}) => {
  const form = useForm();
  const { handleSubmit: _handleSubmit } = form;
  const { transferPin, hasTransferPin, handlePushTransferPinModal, handleClearTransferPin } = useTransferPin();

  const handleSubmit = () =>
    _handleSubmit((data) => {
      if (hasTransferPin) {
        return handlePushTransferPinModal();
      }

      const body = {
        phone_number: data.phoneNumber,
        amount: data.amount,
        operator: currentNetwork.name,
        is_airtime: false,
        transfer_pin: transferPin,
        sender_account_type: accountType,
      };

      console.log(body);
    });

  return {
    form,
    handleSubmit,
    handleClearTransferPin,
  };
};

const SendMoneyMobileData = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileDataProps) => {
  const { allAccountType, accountType, handleAccountTypeChange } = useAccountType();
  const { form, handleSubmit, handleClearTransferPin } = useSendMoneyMobileData({ currentNetwork, accountType });
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount({
    form,
    handleClearTransferPin,
  });

  return (
    <div>
      <Tag />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NetworkSelector
          currentNetwork={currentNetwork}
          isDropRestNetworks={isDropRestNetworks}
          restNetworks={restNetworks}
          onCurrentNetworkClick={handleCurrentNetworkClick}
          onCurrentNetworkChange={handleCurrentNetworkChange}
        />

        <Input
          muteMargin
          type="text"
          placeholder="Phone number"
          maxLength={11}
          rest={{
            ...form.register("phoneNumber"),
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {SEND_MONEY_MOBILE_BUNDLES.map((bundle) => {
          return (
            <div
              style={{
                display: "grid",
                placeItems: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
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

      <div>
        <h3>From Account?</h3>

        {allAccountType.map((type) => (
          <div
            key={type}
            data-testid="account-type-radio"
            onClick={() => handleAccountTypeChange(type as TUserAccountType)}
            className={accountType === type ? "active" : ""}
          >
            {type}
          </div>
        ))}
      </div>

      <button disabled={isPayButtonDisabled} onClick={handleSubmit()}>
        Pay
      </button>
    </div>
  );
};

export default SendMoneyMobileData;
