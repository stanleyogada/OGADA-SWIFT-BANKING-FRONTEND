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
    handleCurrentBankCodeChange,
    register,
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
