import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import useTransferPin from "@hooks/useTransferPin";

import SendMoneyWrapper from "./SendMoneyWrapper";

type TSendMoneyMobileAirtimeProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const useSendMoneyMobileAirtime = ({ currentNetwork }: { currentNetwork: TSendMoneyMobileNetwork }) => {
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
        is_airtime: true,
        transfer_pin: transferPin,
      };

      console.log(body);
    });

  return {
    form,
    handleSubmit,
  };
};

const SendMoneyMobileAirtime = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileAirtimeProps) => {
  const { form, handleSubmit } = useSendMoneyMobileAirtime({ currentNetwork });
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount(form);

  return (
    <SendMoneyWrapper>
      <div className="mobile-container">
        <Tag />

        <div className="network-wrapper">
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

        <div className="plan-grid">
          {SEND_MONEY_MOBILE_BUNDLES.slice(0, 6).map((bundle) => {
            return (
              <div
                key={bundle.amount}
                data-testid="bundle"
                id="plans"
                className={currentBundleAmount === bundle.amount.toString() ? "active" : ""}
                onClick={() => handleBundleClick(bundle.amount.toString())}
              >
                <div>{bundle.amount}</div>
              </div>
            );
          })}
        </div>

        <div className="amount-input">
          <Input
            type="text"
            placeholder="Amount"
            rest={{
              ...form.register("amount", {
                min: 2,
              }),
            }}
          />

          <button disabled={isPayButtonDisabled} onClick={handleSubmit()}>
            Pay
          </button>
        </div>
      </div>
    </SendMoneyWrapper>
  );
};

export default SendMoneyMobileAirtime;
