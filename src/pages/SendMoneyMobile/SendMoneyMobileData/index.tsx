import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import { SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";
import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

import NetworkSelector from "../NetworkSelector";
import useCurrentBundleAmount from "../hooks/useCurrentBundleAmount";
import AccountType from "../AccountType";
import useAccountType from "../AccountType/useAccountType";
import useTabData from "../hooks/useTabData";
import formatToCurrency from "@utils/formatToCurrency";
import Beneficiaries from "@components/SendMoney/Beneficiaries";

type TSendMoneyMobileDataProps = {
  currentNetwork: TSendMoneyMobileNetwork;
  isDropRestNetworks: boolean;
  restNetworks: TSendMoneyMobileNetwork[];
  handleCurrentNetworkClick: () => void;
  handleCurrentNetworkChange: (networkId: string) => void;
};

const SendMoneyMobileData = ({
  currentNetwork,
  isDropRestNetworks,
  restNetworks,
  handleCurrentNetworkClick,
  handleCurrentNetworkChange,
}: TSendMoneyMobileDataProps) => {
  const { allAccountType, accountType, handleAccountTypeChange } = useAccountType();
  const {
    beneficiaries,
    showBeneficiaries,
    form,
    mutation,
    handleSubmit,
    handleClearTransferPin,
    handleBeneficiaryClick,
  } = useTabData({
    isAirtime: false,
    currentNetwork,
    accountType,
    handleCurrentNetworkChange,
  });
  const { currentBundleAmount, isPayButtonDisabled, handleBundleClick } = useCurrentBundleAmount({
    form,
    mutationIsLoading: mutation.isLoading,
    handleClearTransferPin,
  });

  return (
    <div>
      <Tag />

      <div className="network-selector">
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

      <div className="bundles">
        {SEND_MONEY_MOBILE_BUNDLES.map((bundle) => {
          return (
            <div
              key={bundle.amount}
              data-testid="bundle"
              onClick={() => handleBundleClick(bundle.amount.toString())}
              className={currentBundleAmount === bundle.amount.toString() ? "bundles__item active" : "bundles__item"}
            >
              <p className="bundles__amount">{bundle.amount}</p>
              <p className="bundles__amount--keep">{formatToCurrency(bundle.amount.toString())}</p>
              <p className="bundles__data">{bundle.data}</p>
              <p className="bundles__validity">{bundle.validity}</p>

              {bundle.tag && (
                <div data-testid="bundle-tag" className="bundles__tag">
                  <p>{bundle.tag}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AccountType
        allAccountType={allAccountType}
        handleAccountTypeChange={handleAccountTypeChange}
        accountType={accountType}
      />

      <button disabled={isPayButtonDisabled} onClick={handleSubmit()} className="pay-button">
        Pay
        {mutation.isLoading && <div data-testid="loading"></div>}
        {mutation.isSuccess && <div data-testid="success"></div>}
        {mutation.isError && <div data-testid="error"></div>}
      </button>

      <Beneficiaries
        beneficiaries={beneficiaries}
        showBeneficiaries={showBeneficiaries}
        onBeneficiaryClick={handleBeneficiaryClick}
      />
    </div>
  );
};

export default SendMoneyMobileData;
