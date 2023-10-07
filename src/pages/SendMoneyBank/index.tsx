import PageNavHeader from "@components/PageNavHeader";
import Beneficiaries from "@components/SendMoney/Beneficiaries";
import vector from "@constants/images/vector";
import AmountRemarkForm from "@components/SendMoney/AmountRemarkForm";

import useSendMoneyBank from "./hooks/useSendMoneyBank";

import type { UseMutationResult } from "react-query";
import Input from "@components/SendMoney/Input";
import Tag from "@components/SendMoney/Tag";
import SendMoneyBankWrapper from "./SendMoneyBankWrapper";
import BankItem from "./BankItem";

const SendMoneyBank = () => {
  const {
    showBeneficiaries,
    beneficiaries,
    verifyAccount,
    banks,
    currentBank,
    recipientAccountNumberInputIsDisabled,
    isRecipientFound,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    handleCurrentBankCodeChange,
    register,
    handleSendMoney,
    handleBeneficiaryClick,
    filtered,
  } = useSendMoneyBank();

  const listData = () => {
    if (filtered.data) {
      return filtered.data?.map((bank) => (
        <BankItem
          key={bank.code}
          bankLogo={bank.logo}
          bankName={bank.name}
          onClick={() => handleCurrentBankCodeChange(bank.code)}
          dataTestid="bank"
        />
      ));
    }
    return banks.data?.map((bank) => (
      <BankItem
        key={bank.code}
        bankLogo={bank.logo}
        bankName={bank.name}
        onClick={() => handleCurrentBankCodeChange(bank.code)}
        dataTestid="bank"
      />
    ));
  };

  return (
    <SendMoneyBankWrapper>
      <PageNavHeader heading="Transfer to Bank Account" />

      <Input
        title="Recipient Account"
        type="text"
        placeholder="Recipient account number"
        maxLength={10}
        disabled={recipientAccountNumberInputIsDisabled}
        rest={{
          ...register("recipientAccountNumber"),
        }}
      />
      <Input
        type="text"
        placeholder="search bank"
        maxLength={10}
        rest={{
          ...register("searchBank"),
        }}
        isVisible={currentBank}
      />

      <Tag />

      <div className="bank-container">
        {currentBank && (
          <div data-testid="current-bank" className="current-bank">
            <BankItem bankName={currentBank.name} bankLogo={currentBank.logo} />

            <button data-testid="remove" onClick={() => handleCurrentBankCodeChange(null)}>
              remove
            </button>
          </div>
        )}

        {!currentBank && (
          <div className="banks">
            <h3 className="banks__title">Select a bank</h3>

            {banks.isLoading && <div data-testid="get-all-banks-loading">Loading banks...</div>}
            <div className="all-banks">{listData()}</div>
          </div>
        )}

        <div className="sendData">
          {isRecipientFound && (
            <div className="user-found">
              <p>{verifyAccount.data?.accountName}</p>
              {vector.checkIcon()}
            </div>
          )}

          <AmountRemarkForm
            isRecipientFound={isRecipientFound}
            onSubmit={handleSendMoney}
            isDisabled={isSendMoneyButtonDisabled}
            sendMoneyMutation={sendMoneyMutation as UseMutationResult}
            register={register}
          />

          {verifyAccount.isLoading && <div data-testid="verify-account-loading">Verifying account...</div>}
          {verifyAccount.isError && <div data-testid="verify-account-error">Error verifying account</div>}

          <Beneficiaries
            showBeneficiaries={showBeneficiaries}
            beneficiaries={beneficiaries}
            onBeneficiaryClick={handleBeneficiaryClick}
          />
        </div>
      </div>
    </SendMoneyBankWrapper>
  );
};

export default SendMoneyBank;
