import useSendMoneyInHouse from "./hooks/useSendMoneyInHouse";

const SendMoneyInHouse = () => {
  const {
    phone,
    recipient,
    sendMoneyMutation,
    isSendMoneyButtonDisabled,
    handlePhoneChange,
    handleSendMoney,
    register,
  } = useSendMoneyInHouse();

  return (
    <>
      <input type="text" placeholder="Recipient account number" value={phone} onChange={handlePhoneChange} />

      {recipient.data && (
        <div data-testid="user-block">
          <p data-testid="user-full-name">{recipient.data?.fullName}</p>

          <p>{recipient.data?.phone}</p>

          <img src={recipient.data?.avatar} alt="avatar" />
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
        {sendMoneyMutation.isSuccess && <div data-testid="send-money-success">Money sent successfully</div>}
      </form>

      {recipient.isError && <div data-testid="get-user-by-phone-error">Error searching for the user</div>}
      {recipient.isLoading && <div data-testid="get-user-by-phone-loading">Searching for the user...</div>}
    </>
  );
};

export default SendMoneyInHouse;
