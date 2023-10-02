import PageNavHeader from "@components/PageNavHeader";
import Beneficiaries from "@components/SendMoney/Beneficiaries";
import ListItem from "@components/SendMoney/ListItem";

import useSendMoneyInHouse from "./hooks/useSendMoneyInHouse";
import SendMoneyInHouseWrapper from "./SendMoneyInHouseWrapper";

import AmountRemarkForm from "@components/SendMoney/AmountRemarkForm";
import { UseMutationResult } from "react-query";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

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

      <Input title="Recipient Account" type="text" placeholder="Recipient account number" register={register} />

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

type TProps = {
  title?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
};

const Input = ({ title, type, placeholder, register }: TProps) => {
  return (
    <InputWrapper>
      {title && <h3>{title}</h3>}

      <input type={type} placeholder={placeholder} {...register("recipientAccountNumber")} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  padding: 20px 16px 0;

  input {
    margin-top: 15px;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
  }
`;

export default SendMoneyInHouse;
