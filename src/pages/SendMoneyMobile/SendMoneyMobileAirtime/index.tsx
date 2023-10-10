import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import useTransferPin from "@hooks/useTransferPin";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";
import AccountType from "../AccountType";
import useAccountType from "../AccountType/useAccountType";

import type { TUserAccountType } from "@services/users/types";

type TSendMoneyMobileAirtimeProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useSendMoneyMobileAirtime = ({
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
        is_airtime: true,
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

const SendMoneyMobileAirtime = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileAirtimeProps) => {
  const { allAccountType, accountType, handleAccountTypeChange } = useAccountType();
  const { form, handleSubmit, handleClearTransferPin } = useSendMoneyMobileAirtime({ currentNetwork, accountType });
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
        {SEND_MONEY_MOBILE_BUNDLES.slice(0, 6).map((bundle) => {
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
              className={currentBundleAmount === bundle.amount.toString() ? "active" : ""}
              onClick={() => handleBundleClick(bundle.amount.toString())}
            >
              <div>{bundle.amount}</div>
            </div>
          );
        })}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Amount"
          rest={{
            ...form.register("amount", {
              min: 2,
            }),
          }}
        />

        <AccountType
          allAccountType={allAccountType}
          handleAccountTypeChange={handleAccountTypeChange}
          accountType={accountType}
        />

        <button disabled={isPayButtonDisabled} onClick={handleSubmit()}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default SendMoneyMobileAirtime;
