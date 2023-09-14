import { CLIENT_ROUTES } from "@constants/routes";
import { getOneTransaction } from "@services/transaction";
import { ETransactionAllType } from "@services/transaction/types";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const useGetOneTransaction = (type: string, id: string) => {
  const { data, error, isError } = useQuery(["transaction", id, type], () =>
    getOneTransaction(type as ETransactionAllType, id)
  );

  const navigate = useNavigate();

  const is404Error = useMemo(() => {
    // @ts-ignore
    if (isError && error?.response.status === 404) {
      return true;
    } else {
      return false;
    }
  }, [error && isError]);

  useEffect(() => {
    if (is404Error) {
      navigate(CLIENT_ROUTES._404);
    }
  }, [is404Error]);

  return {
    data,
    is404Error,
  };
};

export default useGetOneTransaction;
