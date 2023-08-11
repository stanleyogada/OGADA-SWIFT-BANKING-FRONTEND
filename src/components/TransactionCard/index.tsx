import vector from "@constants/images/vector";

const TransactionCard = () => {
  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <div className="trans-icon">{vector.cashback()}</div>
        <div className="info-wrapper">
          <div className="title">Daily Cashback</div>
          <div className="trans-date">Aug 10th,16:30</div>
        </div>
      </div>

      <div className="transaction-details">
        <p className="amount">+N5.00</p>
        <p className="status">Successful</p>
      </div>
    </div>
  );
};

export default TransactionCard;
