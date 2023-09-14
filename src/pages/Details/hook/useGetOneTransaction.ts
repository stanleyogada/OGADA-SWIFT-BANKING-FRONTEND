import { ETransactionAllType } from "@services/transaction/types";
import getOneTransaction from "@services/transactionDetails";
import { useQuery } from "react-query";

const useGetOneTransaction = (type: string, id: string) => {
  const { data } = useQuery(["transaction", id, type], () => getOneTransaction(type as ETransactionAllType, id));

  return {
    data,
  };
};

export default useGetOneTransaction;
