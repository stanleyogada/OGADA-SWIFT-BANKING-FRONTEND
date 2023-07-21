import { useMemo } from "react";
import { useMutation } from "react-query";

import useCurrentUser from "./useCurrentUser";
import { postSignIn } from "../services/auth";
import { AxiosError } from "axios";

const useAuth = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const userIsAuthenticated = useMemo(() => {
    if (isLoading) {
      return null;
    }
    if (currentUser === null) {
      return false;
    }

    return true;
  }, [currentUser, isLoading]);

  //
  //

  const signInMutation = useMutation(postSignIn, {
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token); // TODO: remove this after fixing cookie issue on the backend
      window.location.reload();
    },
  });

  const handleSignIn = (phoneNumber: string, loginPasscode: string) => {
    signInMutation.mutate({ phoneNumber, loginPasscode });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token"); // TODO: remove this after fixing cookie issue on the backend

    // signOutMutation(); // TODO: real implementation:: call the signOutMutation

    window.location.reload();
  };

  const signInMutationState = useMemo(
    () => ({
      isLoading: signInMutation.isLoading,
      error: signInMutation.error as AxiosError,
      isError: signInMutation.isError,
    }),
    [signInMutation.isLoading, signInMutation.error, signInMutation.isError]
  );

  return {
    currentUser,
    // signOutMutationState // TODO: add this after implementing signout mutation
    signInMutationState,
    userIsAuthenticated,
    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
