import Tabs from "@components/Tabs/Tabs";
import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

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
          <div>
            <div data-testid="current-network" onClick={handleCurrentNetworkClick}>
              <img src={currentNetwork.logo} alt={currentNetwork.name} width="50" height="50" />
            </div>
            {isDropRestNetworks && (
              <div data-testid="networks">
                {restNetworks.map((network) => (
                  <div key={network.id} data-testid="network" onClick={() => handleCurrentNetworkChange(network.id)}>
                    <img src={network.logo} alt={network.name} width="50" height="50" />
                    <p>{network.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div></div>
      </Tabs>
    </>
    // <form onSubmit={handleSubmit()}>
    //   <select aria-label="Mode" aria-selected={currentMode} {...register("mode")}>
    //     <option>Select Mode</option>
    //     <option>Airtime</option>
    //     <option>Data</option>
    //   </select>
    // </form>
  );
};

export default SendMoneyMobile;
