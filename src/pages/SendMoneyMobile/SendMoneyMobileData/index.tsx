import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";

import NetworkSelector from "../NetworkSelector";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";

type TSendMoneyMobileDataProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
};

const SendMoneyMobileData = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
  register,
  handleSubmit,
}: TSendMoneyMobileDataProps) => {
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
            <div key={bundle.amount} data-testid="bundle">
              <div>{bundle.amount}</div>
              <div>{bundle.data}</div>
              <div>{bundle.validity}</div>

              {bundle.tag && <div data-testid="bundle-tag">{bundle.tag}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SendMoneyMobileData;
