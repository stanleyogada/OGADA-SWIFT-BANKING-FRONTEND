import { DEFAULT_BANK_LOGO } from "@constants/index";
import useSendMoneyBank from "./hooks/useSendMoneyBank";
import { TBank } from "@services/banks/types";

const SendMoneyBank = () => {
  const {
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
  } = useSendMoneyBank();

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient account number"
        maxLength={10}
        disabled={recipientAccountNumberInputIsDisabled}
        {...register("recipientAccountNumber")}
      />

      {currentBank && (
        <div data-testid="current-bank">
          <Bank bank={currentBank} />

          <button data-testid="remove" onClick={() => handleCurrentBankCodeChange(null)}>
            remove
          </button>
        </div>
      )}

      {!currentBank && (
        <div>
          <h2>Select a bank</h2>

          {banks.isLoading && <div data-testid="get-all-banks-loading">Loading banks...</div>}

          {banks.data?.map((bank) => (
            <Bank
              key={bank.code}
              bank={bank}
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

        {/* {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
        {sendMoneyMutation.isSuccess && <div data-testid="send-money-success">Money sent successfully</div>} */}
      </form>

      {verifyAccount.isLoading && <div data-testid="verify-account-loading">Verifying account...</div>}
      {isRecipientFound && <div>{verifyAccount.data?.accountName}</div>}
      {verifyAccount.isError && <div data-testid="verify-account-error">Error verifying account</div>}
    </div>
  );
};

const Bank = ({ dataTestid, bank, onClick }: { bank: TBank; onClick?: () => void; dataTestid?: string }) => {
  return (
    <div data-testid={dataTestid} onClick={onClick}>
      <p>{bank.name}</p>
      <p>{bank.code}</p>
      <img src={bank.logo || DEFAULT_BANK_LOGO} alt={bank.name} width={30} height={30} />
    </div>
  );
};

export default SendMoneyBank;
