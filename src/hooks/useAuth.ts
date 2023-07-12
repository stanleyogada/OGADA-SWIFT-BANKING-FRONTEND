import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser";

const useAuth = () => {
  const { data: user, isLoading } = useCurrentUser();

  const userIsAuthenticated = useMemo(() => {
    if (isLoading) {
      return null;
    }

    if (user === null) {
      return false;
    } else {
      return true;
    }
  }, [user, isLoading]);

  return {
    userIsAuthenticated,
  };
};

export default useAuth;
