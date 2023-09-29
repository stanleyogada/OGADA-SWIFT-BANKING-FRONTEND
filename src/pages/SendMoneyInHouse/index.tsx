import PageNavHeader from "@components/PageNavHeader";
import { TBeneficiary } from "@customTypes/Beneficiary";
import useSendMoneyInHouse from "./hooks/useSendMoneyInHouse";
import SendMoneyWrapper from "./SendMoneyInHouseWrapper";
import Input from "@components/Input";

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

      {showBeneficiaries && (
        <div>
          <div className="beneficiaries">
            <h3>Beneficiaries</h3>
          </div>

          {!beneficiaries.length && <p>No Beneficiaries</p>}

          {beneficiaries.map((beneficiary: TBeneficiary) => (
            <div
              className="user-block beneficiary"
              key={beneficiary.accountNumber}
              data-testid="beneficiary"
              onClick={() => handleBeneficiaryClick(beneficiary.accountNumber as string)}
            >
              <img className="user-image" src={beneficiary.avatar} alt="avatar" />
              <div className="text-wrapper">
                <p className="fullname">{beneficiary.accountNumber}</p>
                <p className="phone">{beneficiary.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SendMoneyWrapper>
  );
};

export default SendMoneyInHouse;
