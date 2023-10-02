import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Tabs from "@components/Tabs/Tabs";
import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";
import PageNavHeader from "@components/PageNavHeader";
import Tag from "@components/SendMoney/Tag";
import Input from "@components/SendMoney/Input";
import AmountRemarkForm from "@components/SendMoney/AmountRemarkForm";

import NetworkSelector from "./NetworkSelector";

const useSendMoneyMobile = () => {
  const { watch, register, handleSubmit: _handleSubmit } = useForm();
  const handleSubmit = () => _handleSubmit((data) => {});
  // const currentMode = watch("mode");

  const [currentNetwork, setCurrentNetwork] = useState(SEND_MONEY_MOBILE_NETWORKS[0]);
  const [isDropRestNetworks, setIsDropRestNetworks] = useState(false);

  const handleCurrentNetworkClick = () => {
    setIsDropRestNetworks((isDropRestNetworks) => !isDropRestNetworks);
  };

  const handleCurrentNetworkChange = (networkId: string) => {
    const network = SEND_MONEY_MOBILE_NETWORKS.find((network) => network.id === networkId);

    if (!network) {
      throw new Error("network is undefined");
    }

    setCurrentNetwork(network);
    setIsDropRestNetworks(false);
  };

  const restNetworks = useMemo(() => {
    return SEND_MONEY_MOBILE_NETWORKS.filter((network) => network.name !== currentNetwork.name);
  }, [currentNetwork]);

  return {
    currentNetwork,
    isDropRestNetworks,
    restNetworks,
    handleCurrentNetworkClick,
    handleCurrentNetworkChange,
    // currentMode,
    register,
    handleSubmit,
  };
};

const SendMoneyMobile = () => {
  const {
    currentNetwork,
    isDropRestNetworks,
    restNetworks,
    handleCurrentNetworkClick,
    handleCurrentNetworkChange,
    // currentMode,
    register,
    handleSubmit,
  } = useSendMoneyMobile();

  return (
    <>
      <PageNavHeader heading="Transfer to Bank Account" />

      <Tabs
        data={[
          {
            id: "airtime",
            heading: "Airtime",
          },
          {
            id: "data",
            heading: "Data",
          },
        ]}
      >
        <div>
          <Tag />

          <Input
            title="Phone"
            type="text"
            placeholder="Phone number"
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

          {/* <AmountRemarkForm
            isDisabled={false}
            onSubmit={handleSubmit}
            register={register}
            isRecipientFound={false}
            // sendMoneyMutation={}
          /> */}
        </div>
        <div>
          <Tag />

          <Input
            title="Phone"
            type="text"
            placeholder="Phone number"
            // rest={{
            //   ...register("recipientAccountNumber"),
            // }}
          />

          <NetworkSelector
            currentNetwork={currentNetwork}
            isDropRestNetworks={isDropRestNetworks}
            restNetworks={restNetworks}
            onCurrentNetworkClick={handleCurrentNetworkClick}
            onCurrentNetworkChange={handleCurrentNetworkChange}
          />
        </div>
      </Tabs>
    </>
  );
};

export default SendMoneyMobile;
