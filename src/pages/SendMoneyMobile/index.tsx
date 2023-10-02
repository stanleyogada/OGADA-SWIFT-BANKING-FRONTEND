import { useMemo, useState } from "react";

import Tabs from "@components/Tabs/Tabs";
import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";

import NetworkSelector from "./NetworkSelector";

const useSendMoneyMobile = () => {
  // const { watch, register, handleSubmit: _handleSubmit } = useForm();
  // const handleSubmit = () => _handleSubmit((data) => {});
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
    // register,
    // handleSubmit,
  };
};

const SendMoneyMobile = () => {
  const {
    currentNetwork,
    isDropRestNetworks,
    restNetworks,
    handleCurrentNetworkClick,
    handleCurrentNetworkChange,
    // currentMode, register, handleSubmit
  } = useSendMoneyMobile();

  return (
    <>
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
          <NetworkSelector
            currentNetwork={currentNetwork}
            isDropRestNetworks={isDropRestNetworks}
            restNetworks={restNetworks}
            onCurrentNetworkClick={handleCurrentNetworkClick}
            onCurrentNetworkChange={handleCurrentNetworkChange}
          />
        </div>
        <div>
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
