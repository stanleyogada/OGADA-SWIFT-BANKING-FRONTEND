import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

const useSendMoneyMobile = () => {
  const {
    // watch,
    register,
    handleSubmit: _handleSubmit,
  } = useForm();
  const handleSubmit = () => _handleSubmit((data) => {});
  // const currentMode = watch("mode");

  const [currentNetwork, setCurrentNetwork] = useState<TSendMoneyMobileNetwork>(SEND_MONEY_MOBILE_NETWORKS[0]);
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

  const restNetworks: TSendMoneyMobileNetwork[] = useMemo(() => {
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

export default useSendMoneyMobile;
