import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";
import AccountType from "../AccountType";
import useAccountType from "../AccountType/useAccountType";
import useTabData from "../hooks/useTabData";

type TSendMoneyMobileAirtimeProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const SendMoneyMobileAirtime = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileAirtimeProps) => {
  const { allAccountType, accountType, handleAccountTypeChange } = useAccountType();
  const { form, mutation, handleSubmit, handleClearTransferPin } = useTabData({
    isAirtime: true,
    currentNetwork,
    accountType,
  });
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount({
    form,
    mutationIsLoading: mutation.isLoading,
    handleClearTransferPin,
  });

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
        {SEND_MONEY_MOBILE_BUNDLES.slice(0, 6).map((bundle) => {
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
              className={currentBundleAmount === bundle.amount.toString() ? "active" : ""}
              onClick={() => handleBundleClick(bundle.amount.toString())}
            >
              <div>{bundle.amount}</div>
            </div>
          );
        })}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Amount"
          rest={{
            ...form.register("amount", {
              min: 2,
            }),
          }}
        />

        <AccountType
          allAccountType={allAccountType}
          handleAccountTypeChange={handleAccountTypeChange}
          accountType={accountType}
        />

        <button disabled={isPayButtonDisabled} onClick={handleSubmit()}>
          Pay
          {mutation.isLoading && <div data-testid="loading"></div>}
          {mutation.isSuccess && <div data-testid="success"></div>}
          {mutation.isError && <div data-testid="error"></div>}
        </button>
      </div>
    </div>
  );
};

export default SendMoneyMobileAirtime;
