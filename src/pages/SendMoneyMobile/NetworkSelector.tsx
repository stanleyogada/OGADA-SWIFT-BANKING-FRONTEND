import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

type TProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  onCurrentNetworkClick: () => void;
  onCurrentNetworkChange: (networkId: string) => void;
};

const NetworkSelector = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  onCurrentNetworkClick,
  onCurrentNetworkChange,
}: TProps) => {
  return (
    <div>
      <div data-testid="current-network" onClick={onCurrentNetworkClick}>
        <img src={currentNetwork.logo} alt={currentNetwork.name} width="50" height="50" />
      </div>
      {isDropRestNetworks && (
        <div data-testid="networks">
          {restNetworks.map((network) => (
            <div key={network.id} data-testid="network" onClick={() => onCurrentNetworkChange(network.id)}>
              <img src={network.logo} alt={network.name} width="50" height="50" />
              <p>{network.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;
