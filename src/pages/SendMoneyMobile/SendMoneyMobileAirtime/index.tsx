import { useForm } from "react-hook-form";

import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";

import NetworkSelector from "../NetworkSelector";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";

type TSendMoneyMobileAirtimeProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
};

const SendMoneyMobileAirtime = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
  register,
  handleSubmit,
}: TSendMoneyMobileAirtimeProps) => {
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
          ...register("phoneNumber", {
            min: 2,
          }),
        }}
      />

      <div>
        {SEND_MONEY_MOBILE_BUNDLES.slice(0, 6).map((bundle) => {
          return (
            <div key={bundle.amount} data-testid="bundle">
              <div>{bundle.amount}</div>
            </div>
          );
        })}
      </div>

      {/* <AmountRemarkForm
            isDisabled={false}
            onSubmit={handleSubmit}
            register={register}
            isRecipientFound={false}
            // sendMoneyMutation={}
          /> */}
    </div>
  );
};

export default SendMoneyMobileAirtime;
