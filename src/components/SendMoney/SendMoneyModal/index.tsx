import { COLORS } from "@constants/colors";
import vector from "@constants/images/vector";
import styled from "styled-components";
import useSendMoneyModal from "./hooks/useSendMoneyModal";

const SendMoneyModal = ({ hasError }: { hasError?: boolean }) => {
  const { handleSendMoneyAgain, handleContinueToHome, handleFailTryAgain } = useSendMoneyModal();

  if (hasError) {
    return (
      <TransferWrapper>
        <div className="transfer-wrapper">
          <div className="top">
            <div>{vector.errorIcon()}</div>
            <h2 className="transfer-title">Transfer failed!</h2>
            <p className="transfer-message">
              There was an error sending the money. Please try again. If the problem persists, please contact our
              support
            </p>
          </div>
          <div className="button-wrappers">
            <button onClick={handleFailTryAgain}>Try again</button>
            <button onClick={handleContinueToHome}>Continue to home</button>
          </div>
        </div>
      </TransferWrapper>
    );
  }

  return (
    <TransferWrapper>
      <div className="transfer-wrapper">
        <div className="top">
          <div>{vector.checkIcon()}</div>
          <h2 className="transfer-title">Transfer was successful</h2>
          <p className="transfer-message">
            The money was successfully sent to the recipient. The recipient will receive a notification about the
            transfer shortly
          </p>
          <p className="transfer-message-2">
            Thank you for using our service. If you have any questions, please contact our support team. We are always
            happy to
          </p>
        </div>

        <div className="button-wrappers">
          <button onClick={handleSendMoneyAgain}>Send money again</button>
          <button onClick={handleContinueToHome}>Continue to home</button>
        </div>
      </div>
    </TransferWrapper>
  );
};

const TransferWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: grid;
  place-items: center;
  text-align: center;

  .top {
    margin: 20px 0px;
  }

  .transfer-title {
    font-size: 18px;
    margin-top: 20px;
  }

  .transfer-message,
  .transfer-message-2 {
    color: ${COLORS.darkGray};
    font-size: 15px;
    margin: 10px;
  }

  .transfer-message-2 {
    font-size: 10px;
  }
  .button-wrappers {
    display: flex;
    flex-flow: column;
    align-items: center;

    button {
      padding: 12px;
      width: 80%;
      margin: 2px;
      border: none;
      border-radius: 8px;
      outline: none;
    }

    button:last-child {
      background-color: ${COLORS.blue};
      color: white;
    }
  }
`;

export default SendMoneyModal;
