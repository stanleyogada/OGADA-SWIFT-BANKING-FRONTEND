import vector from "@constants/images/vector";
import { getTransactions } from "@services/transaction";

export type TProps = {
  type: string;
  amount: 90;
  createdAt: string;
  is_success: boolean;
};

const TransactionCard = ({ amount, createdAt, is_success, type }: TProps) => {
  const getTransferIcon = (type: string) => {
    if (type === "transfer") {
      return {
        icon: vector.transfer_icon(),
        url: "http://localhost:3000/transaction/transfer",
      };
    } else if (type === "data") {
      return {
        icon: vector.data(),
        url: "http://localhost:3000/transaction/transfer",
      };
    } else if (type === "cashback") {
      return {
        icon: vector.cashback(),
        url: "http://localhost:3000/transaction/transfer",
      };
    } else if (type === "deposit") {
      return {
        icon: vector.deposit(),
        url: "http://localhost:3000/transaction/transfer",
      };
    }
  };

  return (
    <div className="transaction-card" data-testid="card">
      <div className="transaction-info">
        <div className="trans-icon">{getTransferIcon(type)?.icon}</div>
        <div className="info-wrapper">
          <div className="title">Daily {type}</div>
          <div className="trans-date">{createdAt}</div>
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
