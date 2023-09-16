import { useState } from "react";
import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getCurrentUser } from "@services/users";

const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<{
    isSuccess: boolean;
    isError: boolean;
    error: null | AxiosError;
  }>({
    isSuccess: false,
    isError: false,
    error: null,
  });

  const result = useQuery(QUERY_KEYS.currentUser, getCurrentUser, {
    staleTime: 1000 * 60 * 20, // 20 minutes
    // // If the user is not logged in, we don't want to keep trying to fetch the
    // // current user. Instead, we want to wait for the user to log in and then
    // // try to fetch the current user again.
    retry: false,

    onError: (err: AxiosError) => {
      setStatus({
        isSuccess: false,
        isError: true,
        error: err,
      });

      // If the error is a 401 error, we want to set the current user to null.
      // So RQ will cache that the current user is null and we won't keep trying
      queryClient.setQueryData(QUERY_KEYS.currentUser, null); // NOTE: is simulates a SUCCESSFUL request: THUS you need to manage a custom status state
    },

    onSettled(data) {
      if (data === null) {
        setStatus(({ error }) => ({
          isSuccess: false,
          isError: true,
          error,
        }));

        return;
      }

      if (data !== null && data !== undefined) {
        setStatus({
          isSuccess: true,
          isError: false,
          error: null,
        });
      }
    },
  });

  return Object.assign({}, result, status);
};

export default useCurrentUser;
