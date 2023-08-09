import { useQuery } from "react-query";
import { getTransactions } from "@services/transaction";
const Transaction = () => {
  let { data } = useQuery("key", getTransactions, {
    enabled: true,
  });

  console.log(data);
  return (
    <div>
      <ul>
        {data?.map((d: { type: string; T_id: number }) => {
          return <li key={d.T_id * 2}>{d.type}</li>;
        })}
      </ul>
    </div>
  );
};

export default Transaction;
