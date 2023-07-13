import { useMemo } from "react";
import { useMutation } from "react-query";

import useCurrentUser from "./useCurrentUser";
import { postSignIn } from "../services/auth";

const useAuth = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: signin } = useMutation(postSignIn, {
    onSuccess: (token: string) => {
      localStorage.setItem("token", token); // TODO: remove this after fixing cookie issue on the backend
      window.location.reload();
    },
  });

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

  const handleSignIn = (phone: string, loginPasscode: string) => {
    signin({ phone, loginPasscode });
  };

  return {
    userIsAuthenticated,
    handleSignIn,
    handleSignOut: () => {},
  };
};

export default useAuth;
