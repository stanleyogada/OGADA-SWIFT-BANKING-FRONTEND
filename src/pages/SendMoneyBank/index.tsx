import { COLORS, DEFAULT_BANK_LOGO } from "@constants/index";
import useSendMoneyBank from "./hooks/useSendMoneyBank";
import { TBank } from "@services/banks/types";
import SendMoneyBeneficiaries from "@components/SendMoneyBeneficiaries";
import styled from "styled-components";
import PageNavHeader from "@components/PageNavHeader";

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
  } = useSendMoneyBank();

  return (
    <BankWrapper>
      <PageNavHeader heading="Transfer to Bank Account" />
      <div className="banner-wrapper">
        <div className="banner">Instant, Zero issues,Free</div>
      </div>

      <div className="bank-container">
        <div className="input-wrapper">
          <input
            className="account-number-input"
            type="text"
            placeholder="Recipient account number"
            maxLength={10}
            disabled={recipientAccountNumberInputIsDisabled}
            {...register("recipientAccountNumber")}
          />
        </div>

        {currentBank && (
          <div data-testid="current-bank">
            <Bank bankName={currentBank.name} bankLogo={currentBank.logo} />

            <button data-testid="remove" onClick={() => handleCurrentBankCodeChange(null)}>
              remove
            </button>
          </div>
        )}

        {!currentBank && (
          <div className="banks">
            <h2 className="select">Select a bank</h2>

            {banks.isLoading && <div data-testid="get-all-banks-loading">Loading banks...</div>}

            {banks.data?.map((bank) => (
              <Bank
                key={bank.code}
                bankLogo={bank.logo}
                bankName={bank.name}
                onClick={() => handleCurrentBankCodeChange(bank.code)}
                dataTestid="bank"
              />
            ))}
          </div>
        )}

        <form onSubmit={handleSendMoney()}>
          <input
            type="text"
            placeholder="Amount"
            {...register("amount", {
              required: true,
              min: 3,
            })}
          />
          <input
            type="text"
            placeholder="Note"
            {...register("remark", {
              required: true,
              min: 3,
            })}
          />

          <button type="submit" disabled={isSendMoneyButtonDisabled}>
            Send money
            {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading">Sending money...</div>}
          </button>

          {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
        </form>

        {isRecipientFound && <div>{verifyAccount.data?.accountName}</div>}
        {verifyAccount.isLoading && <div data-testid="verify-account-loading">Verifying account...</div>}
        {verifyAccount.isError && <div data-testid="verify-account-error">Error verifying account</div>}

        <SendMoneyBeneficiaries
          showBeneficiaries={showBeneficiaries}
          beneficiaries={beneficiaries}
          onBeneficiaryClick={handleBeneficiaryClick}
        />
      </div>
    </BankWrapper>
  );
};

const Bank = ({
  dataTestid,
  bankName,
  bankLogo,
  onClick,
}: {
  bankName: TBank["name"];
  bankLogo: TBank["logo"];
  onClick?: () => void;
  dataTestid?: string;
}) => {
  const bank = {
    name: bankName,
    logo: bankLogo,
  };

  return (
    <div data-testid={dataTestid} onClick={onClick}>
      <p>{bank.name}</p>
      {/* <p>{bank.code}</p> */}
      <img src={bank.logo || DEFAULT_BANK_LOGO} alt={bank.name} width={30} height={30} />
    </div>
  );
};

export default SendMoneyBank;

const BankWrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid red;

  .banner-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .banner {
      width: 90%;
      padding: 12px;
      background: ${COLORS.lightBlue};
      border-radius: 12px;
      color: ${COLORS.blue};
      font-weight: 400;
    }
  }

  .bank-container {
    width: 100%;

    .input-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;

      .account-number-input {
        width: 95%;
        height: 40px;
        border-radius: 5px;
        padding: 0 10px;
        margin-bottom: 10px;
        margin: 20px 0px;
        background-color: #fff;
        border: 1px solid #ccc;
      }
    }

    .banks {
      .select {
        font-size: 20px;
        color: ${COLORS.black};
        margin: 10px;
      }
    }
  }
`;
