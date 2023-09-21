import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { CLIENT_ROUTES } from "@constants/routes";
import { getOneTransaction } from "@services/transaction";
import testLogger from "@utils/testLogger";

import type { ETransactionAllType } from "@services/transaction/types";
import type { AxiosError } from "axios";

const useTransactionDetails = (type: string, id: string) => {
  const { data, error, isError, isLoading } = useQuery(["transaction", id, type], () =>
    getOneTransaction(type as ETransactionAllType, id)
  );

  const navigate = useNavigate();

  const is404Error = useMemo(() => {
    if (isError && (error as AxiosError)?.response?.status === 404) {
      return true;
    }

    return false;
  }, [error && isError]);

  useEffect(() => {
    if (is404Error) {
      testLogger("Navigate", CLIENT_ROUTES._404);
      navigate(CLIENT_ROUTES._404);
    }
  }, [is404Error]);

  return {
    data,
    is404Error,
    isLoading,
  };
};

export default useTransactionDetails;
