import PageNavHeader from "@components/PageNavHeader";
import useSendMoneyInHouse from "./hooks/useSendMoneyInHouse";
import SendMoneyWrapper from "./SendMoneyInHouseWrapper";
import SendMoneyBeneficiaries from "@components/SendMoneyBeneficiaries";

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
    <SendMoneyWrapper isRecipientFound={isRecipientFound}>
      <PageNavHeader heading="Transfer to Opay Account" />

      <div className="recipient-title">Recipient Account</div>
      <div className="input-wrapper">
        <input
          className="recipient-input"
          type="text"
          placeholder="Recipient account number"
          {...register("recipientAccountNumber")}
        />
      </div>

      <div className="banner-wrapper">
        <div className="banner">Instant, Zero issues,Free</div>
      </div>

      {isRecipientFound && (
        <div className="user-block" data-testid="user-block">
          <img className="user-image" src={recipient.data?.avatar} alt="avatar" />
          <div className="text-wrapper">
            <p className="fullname" data-testid="user-full-name">
              {recipient.data?.fullName}
            </p>

            <p className="phone">{recipient.data?.phone}</p>
          </div>
        </div>
      )}

      <form className="user-form" onSubmit={handleSendMoney()}>
        <input
          type="text"
          className="recipient-input"
          placeholder="Amount"
          {...register("amount", {
            required: true,
            min: 3,
          })}
        />
        <input
          className="recipient-input"
          type="text"
          placeholder="Note"
          {...register("remark", {
            required: true,
            min: 3,
          })}
        />

        <button className="transfer-btn" type="submit" disabled={isSendMoneyButtonDisabled}>
          Send money
          {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading">Sending money...</div>}
        </button>

        {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
        {sendMoneyMutation.isSuccess && <div data-testid="send-money-success">Money sent successfully</div>}
      </form>

      {recipient.isError && <div data-testid="get-user-by-account-number-error">Error searching for the user</div>}
      {recipient.isLoading && <div data-testid="get-user-by-account-number-loading">Searching for the user...</div>}

      <SendMoneyBeneficiaries
        showBeneficiaries={showBeneficiaries}
        beneficiaries={beneficiaries}
        onBeneficiaryClick={handleBeneficiaryClick}
      />
    </SendMoneyWrapper>
  );
};

export default SendMoneyInHouse;
