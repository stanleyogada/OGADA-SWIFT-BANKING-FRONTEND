import { useQuery, useQueryClient } from "react-query";
import { getCurrentUser } from "../services/users";
import { QUERY_KEYS } from "../constants/services";

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  const result = useQuery(QUERY_KEYS.currentUser, getCurrentUser, {
    staleTime: 1000 * 60 * 20, // 20 minutes
    // // If the user is not logged in, we don't want to keep trying to fetch the
    // // current user. Instead, we want to wait for the user to log in and then
    // // try to fetch the current user again.
    retry: false,

    onError: () => {
      // If the error is a 401 error, we want to set the current user to null.
      // So RQ will cache that the current user is null and we won't keep trying
      queryClient.setQueryData(QUERY_KEYS.currentUser, null);
    },
  });

  return result;
};

export default useCurrentUser;
