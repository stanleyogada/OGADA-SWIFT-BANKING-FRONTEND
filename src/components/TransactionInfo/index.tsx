const TransactionInfo = ({ _key, value }: { _key: string; value: string | boolean | number }) => {
  const getKey = (val: string) => {
    switch (val) {
      case "is success":
        return "status";

      case "is deposit":
        return "deposit";

      default:
        return _key;
    }
  };

  const getValue = (val: string | boolean | number) => {
    switch (value) {
      case true:
        return "successful";

      case false:
        return "failed";

      default:
        return value;
    }
  };
  return (
    <div className="transaction-info" data-testid="details">
      <div className="infoWrapper">
        <div className="transaction-title">{getKey(_key)}</div>

        <div className="result">{getValue(value)}</div>
      </div>
    </div>
  );
};

export default TransactionInfo;
