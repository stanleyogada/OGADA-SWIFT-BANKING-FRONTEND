import vector from "@constants/images/vector";
import { getTransactions } from "@services/transaction";
import switches from "@utils/getIcons";

export type TProps = {
  type: string;
  amount: number;
  created_at: string;
  is_success: boolean;
  charge?: number;
};

const TransactionCard = ({ amount, created_at, is_success, type }: TProps) => {
  return (
    <div className="transaction-card" data-testid="transaction-card">
      <div className="transaction-info">
        <div className="trans-icon">{switches.getTransactionIcon(type)?.icon}</div>
        <div className="info-wrapper">
          <div className="title">Daily {type}</div>
          <div className="trans-date">{created_at}</div>
        </div>
      </div>
      <div className="transaction-details">
        <p className="amount">+N{amount}</p>
        <p className="status">{is_success ? "successful" : "failed"}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
