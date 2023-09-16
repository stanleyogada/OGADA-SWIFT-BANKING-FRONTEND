import { useMemo } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import testLogger from "@utils/testLogger";

import useCurrentUser from "./useCurrentUser";
import { postSignIn } from "../services/auth";
import { CLIENT_ROUTES } from "../constants";

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

  const signInMutation = useMutation(postSignIn, {
    onSuccess: ({ token, emailIsVerified }) => {
      if (!emailIsVerified) {
        handleSignOut(CLIENT_ROUTES.authVerifyEmail);
        return;
      }

      localStorage.setItem("token", token);
      testLogger("logged-in", CLIENT_ROUTES.home);
      location.href = CLIENT_ROUTES.home;
    },
  });

  const handleSignIn = (phoneNumber: string, loginPasscode: string) => {
    signInMutation.mutate({ phoneNumber, loginPasscode });
  };

  const handleSignOut = (redirectTo?: string) => {
    localStorage.removeItem("token");
    if (redirectTo) {
      testLogger("logged-out", redirectTo);
      location.href = redirectTo;

      return;
    }

    window.location.reload();
  };

  const signInMutationState = useMemo(() => {
    const error = signInMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: signInMutation.isLoading,
      error: message,
      isError: signInMutation.isError,
    };
  }, [signInMutation.isLoading, signInMutation.error, signInMutation.isError]);

  return {
    currentUser,
    signInMutationState,
    userIsAuthenticated,
    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
