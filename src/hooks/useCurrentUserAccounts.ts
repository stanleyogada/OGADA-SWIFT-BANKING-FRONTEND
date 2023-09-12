import { useEffect } from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/services";
import { getCurrentUserAccounts } from "@services/users";

import type { TUserAccount, TUserAccountType } from "@services/users/types";

const useCurrentUserAccounts = () => {
  const { data, isLoading, isError } = useQuery(QUERY_KEYS.currentUserAccounts, getCurrentUserAccounts);

  useEffect(() => {
    if (isError) {
      alert("Error fetching user accounts");
    }
  }, [isError]);

  const getAccount = (accountType: TUserAccountType): TUserAccount | undefined => {
    if (!data) {
      return undefined;
    }

    const account = data.find((account) => account.type === accountType);

    return account;
  };

  return {
    data,
    isLoading,
    getAccount,
  };
};

export default useCurrentUserAccounts;
