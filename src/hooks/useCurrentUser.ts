import { useQuery } from "react-query";
import { getCurrentUser } from "../services/users";
import { QUERY_KEYS } from "../constants/services";

const useCurrentUser = () => {
  const result = useQuery(QUERY_KEYS.currentUser, getCurrentUser, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    // If the user is not logged in, we don't want to keep trying to fetch the
    // current user. Instead, we want to wait for the user to log in and then
    // try to fetch the current user again.
    retry: false,
  });

  return result;
};

export default useCurrentUser;
