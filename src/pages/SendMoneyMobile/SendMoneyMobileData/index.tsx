import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import useTransferPin from "@hooks/useTransferPin";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

type TSendMoneyMobileDataProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useSendMoneyMobileData = ({ currentNetwork }: { currentNetwork: TSendMoneyMobileNetwork }) => {
  const form = useForm();
  const { handleSubmit: _handleSubmit } = form;
  const { transferPin, hasTransferPin, handlePushTransferPinModal } = useTransferPin();

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
      };

      console.log(body);
    });

  return {
    form,
    handleSubmit,
  };
};

const SendMoneyMobileData = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileDataProps) => {
  const { form, handleSubmit } = useSendMoneyMobileData({ currentNetwork });
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount(form);

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

      <button disabled={isPayButtonDisabled} onClick={handleSubmit()}>
        Pay
      </button>
    </div>
  );
};

export default SendMoneyMobileData;
