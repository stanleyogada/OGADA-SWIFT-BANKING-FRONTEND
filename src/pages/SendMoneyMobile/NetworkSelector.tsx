import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import styled from "styled-components";

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
    <NetworkSelectorWrapper>
      <div className="network-container">
        <div className="current-network" data-testid="current-network" onClick={onCurrentNetworkClick}>
          <img src={currentNetwork.logo} alt={currentNetwork.name} width="50" height="50" />
          <p>{currentNetwork.name}</p>
        </div>
        {isDropRestNetworks && (
          <div className="networks" data-testid="networks">
            {restNetworks.map((network) => (
              <div className="network" key={network.id}>
                <div data-testid="network" onClick={() => onCurrentNetworkChange(network.id)}>
                  <img src={network.logo} alt={network.name} width="50" height="50" />
                </div>
                <p>{network.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </NetworkSelectorWrapper>
  );
};

export default NetworkSelector;

const NetworkSelectorWrapper = styled.div`
  width: 100%;
  .network-container {
    width: 100%;

    .current-network {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 8px;
      img {
        border-radius: 100%;
      }
    }
    .networks {
      width: 100%;
      .network {
        display: flex;
        padding: 8px;

        img {
          border-radius: 100%;
        }

        p {
          padding: 10px;
        }
      }
    }
  }
`;
