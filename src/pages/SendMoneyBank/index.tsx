import { COLORS, DEFAULT_BANK_LOGO } from "@constants/index";
import useSendMoneyBank from "./hooks/useSendMoneyBank";
import { TBank } from "@services/banks/types";
import styled from "styled-components";
import PageNavHeader from "@components/PageNavHeader";
import Beneficiaries from "@components/SendMoney/Beneficiaries";
import ListItem from "@components/SendMoney/ListItem";
import vector from "@constants/images/vector";

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
          <div data-testid="current-bank" className="current-bank">
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
            <div className="allbanks">
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
          </div>
        )}

        <div className="sendData">
          {isRecipientFound && (
            <div className="user-found">
              <p>{verifyAccount.data?.accountName}</p>
              {vector.checkIcon()}
            </div>
          )}
          <form onSubmit={handleSendMoney()}>
            <input
              type="text"
              className="beneficiaryInput"
              placeholder="Amount"
              {...register("amount", {
                required: true,
                min: 3,
              })}
            />
            <input
              type="text"
              className="beneficiaryInput"
              placeholder="Note"
              {...register("remark", {
                required: true,
                min: 3,
              })}
            />

            <button type="submit" disabled={isSendMoneyButtonDisabled} className="sendmoneyBtn">
              Send money
              {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading">Sending money...</div>}
            </button>

            {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
          </form>
          {verifyAccount.isLoading && <div data-testid="verify-account-loading">Verifying account...</div>}
          {verifyAccount.isError && <div data-testid="verify-account-error">Error verifying account</div>}

          <Beneficiaries
            showBeneficiaries={showBeneficiaries}
            beneficiaries={beneficiaries}
            onBeneficiaryClick={handleBeneficiaryClick}
          />
        </div>
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
    <ListItem imgSrc={bank.logo || DEFAULT_BANK_LOGO} text={bank.name} dataTestid={dataTestid} onClick={onClick} />
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

    .sendData {
      form {
        display: flex;
        flex-flow: column;
        align-items: center;

        .beneficiaryInput {
          padding: 12px;
          width: 95%;
          background-color: white;
          margin-top: 10px;
          border-radius: 5px;
        }

        .sendmoneyBtn {
          width: 90%;
          padding: 10px;
          margin-top: 10px;
          background-color: ${COLORS.blue};
          color: white;
          border-radius: 5px;
          border: none;
        }
      }

      .user-found {
        display: flex;
        justify-content: space-between;
        padding: 0 20px 20px;

        img {
          width: 20px;
        }
      }
    }

    .current-bank {
      display: flex;
      padding: 12px;

      .bank {
        display: flex;
        margin-top: 10px;
        padding: 5px;
        width: 95%;
        margin: 0 auto;

        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          border: 0.3px solid ${COLORS.lightGray};
        }

        p {
          margin: 10px;
        }
      }

      button {
        background-color: white;
        border: none;
        padding: 12px;
        font-weight: bold;
        color: ${COLORS.pink};
      }
    }
  }
`;
