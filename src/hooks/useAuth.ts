import { useMemo } from "react";
import { useMutation } from "react-query";

import useCurrentUser from "./useCurrentUser";
import { postSignIn } from "../services/auth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../constants";

const useAuth = () => {
  const navigate = useNavigate();

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

  // TODO: add this after fixing cookie issue on the backend
  // const signOutMutation = useMutation(postSignOut, {
  //   onSuccess: (redirectTo?: string) => {
  //     if (redirectTo) {
  //       navigate(redirectTo);
  //       return;
  //     }

  //     window.location.reload();
  //   },
  // })

  const signInMutation = useMutation(postSignIn, {
    onSuccess: ({ token, emailIsVerified }) => {
      if (emailIsVerified) {
        localStorage.setItem("token", token); // TODO: remove this after fixing cookie issue on the backend
        window.location.reload(); // Signifies that the user is logged in successfully

        return;
      }

      handleSignOut(CLIENT_ROUTES.authVerifyEmail); // Signs out but skips the reload
    },
  });

  const handleSignIn = (phoneNumber: string, loginPasscode: string) => {
    signInMutation.mutate({ phoneNumber, loginPasscode });
  };

  const handleSignOut = (redirectTo?: string) => {
    // signOutMutation.mutate(redirectTo); // Signs out but skips the reload // TODO: real implementation:: call the signOutMutation

    // TODO: remove all code below after fixing cookie issue on the backend
    localStorage.removeItem("token"); // TODO: remove this after fixing cookie issue on the backend

    if (redirectTo) {
      navigate(redirectTo);
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
    // signOutMutationState // TODO: add this after implementing signout mutation
    signInMutationState,
    userIsAuthenticated,
    handleSignIn,
    handleSignOut,
  };
};

export default useAuth;
