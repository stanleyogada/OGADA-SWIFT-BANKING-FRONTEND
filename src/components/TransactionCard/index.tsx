import switches from "@utils/getIcons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export type TProps = {
  transaction_type: string;
  amount: number;
  created_at: string;
  is_success: boolean;
  charge?: number;
  is_deposit?: boolean;
};

const TransactionCard = ({ amount, created_at, is_success, transaction_type, is_deposit }: TProps) => {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => {
    const data = dayjs(created_at).format("MMM D, YYYY h:mm A");
    setDay(data);
  }, []);

  return (
    <div className="transaction-card" data-testid="transaction-card">
      <div className="transaction-info">
        <div className="trans-icon">{switches.getTransactionIcon(transaction_type)?.icon}</div>
        <div className="info-wrapper">
          <div className="title" data-testid="transaction-type">
            Daily {transaction_type}
          </div>
          <div className="trans-date">{day}</div>
        </div>
      </div>
      <div className="transaction-details">
        <p className="amount">
          {is_deposit ? "+" : "-"}N{amount}
        </p>
        <p className="status">{is_success ? "successful" : "failed"}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
