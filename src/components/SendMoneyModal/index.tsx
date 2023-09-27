import useSendMoneyModal from "./hooks/useSendMoneyModal";

const SendMoneyModal = ({ hasError }: { hasError?: boolean }) => {
  const { handleSendMoneyAgain, handleContinueToHome, handleFailTryAgain } = useSendMoneyModal();

  if (hasError) {
    return (
      <div>
        <h2>Transfer failed!</h2>
        <p>
          There was an error sending the money. Please try again. If the problem persists, please contact our support
        </p>

        <div>
          <button onClick={handleFailTryAgain}>Try again</button>
          <button onClick={handleContinueToHome}>Continue to home</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Transfer was successful</h2>
      <p>
        The money was successfully sent to the recipient. The recipient will receive a notification about the transfer
        shortly
      </p>
      <p>
        Thank you for using our service. If you have any questions, please contact our support. We are always happy to
      </p>

      <div>
        <button onClick={handleSendMoneyAgain}>Send money again</button>
        <button onClick={handleContinueToHome}>Continue to home</button>
      </div>
    </div>
  );
};

export default SendMoneyModal;
