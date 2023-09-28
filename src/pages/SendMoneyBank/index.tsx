import { DEFAULT_BANK_LOGO } from "@constants/index";
import useSendMoneyBank from "./hooks/useSendMoneyBank";

const SendMoneyBank = () => {
  const { banks } = useSendMoneyBank();

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient account number"
        // {...register("recipientAccountNumber")}
      />

      <div>
        <h2>Select a bank</h2>

        {banks.isLoading && <div data-testid="get-all-banks-loading">Loading banks...</div>}

        {banks.data?.map((bank: any) => (
          <div key={bank.code} data-testid="bank">
            <p>{bank.name}</p>
            <p>{bank.code}</p>
            <img src={bank.logo || DEFAULT_BANK_LOGO} alt={bank.name} width={30} height={30} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendMoneyBank;
