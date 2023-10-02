import PageNavHeader from "@components/PageNavHeader";
import Beneficiaries from "@components/SendMoney/Beneficiaries";
import ListItem from "@components/SendMoney/ListItem";
import AmountRemarkForm from "@components/SendMoney/AmountRemarkForm";
import Input from "@components/SendMoney/Input";

import useSendMoneyInHouse from "./hooks/useSendMoneyInHouse";
import SendMoneyInHouseWrapper from "./SendMoneyInHouseWrapper";

import type { UseMutationResult } from "react-query";

const SendMoneyInHouse = () => {
  const {
    recipient,
    sendMoneyMutation,
    isSendMoneyButtonDisabled,
    isRecipientFound,
    beneficiaries,
    showBeneficiaries,
    handleSendMoney,
    register,
    handleBeneficiaryClick,
  } = useSendMoneyInHouse();

  return (
    <SendMoneyInHouseWrapper isRecipientFound={isRecipientFound}>
      <PageNavHeader heading="Transfer to Opay Account" />

      <Input
        title="Recipient Account"
        type="text"
        placeholder="Recipient account number"
        rest={{
          ...register("recipientAccountNumber"),
        }}
      />

      <div className="banner-wrapper">
        <div className="banner">Instant, Zero issues,Free</div>
      </div>

      {isRecipientFound && (
        <ListItem
          imgSrc={recipient.data?.avatar as string}
          text={recipient.data?.fullName}
          secondaryText={recipient.data?.phone}
          dataTestid="user-block"
        />
      )}

      <AmountRemarkForm
        isRecipientFound={isRecipientFound}
        onSubmit={handleSendMoney}
        isDisabled={isSendMoneyButtonDisabled}
        sendMoneyMutation={sendMoneyMutation as UseMutationResult}
        register={register}
      />

      {recipient.isError && <div data-testid="get-user-by-account-number-error">Error searching for the user</div>}
      {recipient.isLoading && <div data-testid="get-user-by-account-number-loading">Searching for the user...</div>}

      <Beneficiaries
        showBeneficiaries={showBeneficiaries}
        beneficiaries={beneficiaries}
        onBeneficiaryClick={handleBeneficiaryClick}
      />
    </SendMoneyInHouseWrapper>
  );
};

export default SendMoneyInHouse;
