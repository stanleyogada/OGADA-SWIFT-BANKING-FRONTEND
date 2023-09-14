const TransactionInfo = ({ _key, value }: { _key: string; value: string | boolean | number }) => {
  return (
    <div className="transaction-info" data-testid="details">
      <div className="infoWrapper">
        <div className="transaction-title">{_key === "is success" ? "status" : _key}</div>

        <div className="result">{value === true ? "successful" : value}</div>
      </div>
    </div>
  );
};

export default TransactionInfo;
