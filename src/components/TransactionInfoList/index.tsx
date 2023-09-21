import TransactionInfo from "@components/TransactionInfo";

const TransactionInfoList = ({
  data,
}: {
  data: {
    value: string | number | boolean;
    _key: string;
  }[];
}) => {
  return (
    <>
      {data.map((item, idx) => (
        <TransactionInfo key={idx} _key={item._key} value={item.value} />
      ))}
    </>
  );
};

export default TransactionInfoList;
