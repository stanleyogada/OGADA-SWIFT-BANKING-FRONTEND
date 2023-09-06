import switches from "@utils/getIcons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useCheckDate from "./hook/useCheckDate";

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
  const { switchOnDay, switchOnMonth } = useCheckDate();

  const formatDate = (date: string) => {
    const currentDate = new Date(date);
    const getDay = currentDate.getDay();
    const getMonth = currentDate.getMonth();
    const getFullYear = currentDate.getFullYear();

    return `${switchOnDay(getDay)}, ${switchOnMonth(getMonth)} ${getFullYear}`;
  };

  useEffect(() => {
    const date = formatDate(created_at);
    setDay(date);
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
