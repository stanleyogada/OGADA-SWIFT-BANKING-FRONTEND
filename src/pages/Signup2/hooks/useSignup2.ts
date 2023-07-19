import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import type { TSignUpFormValues } from "../type";
import { useMutation } from "react-query";
import { postSignIn } from "../../../services/auth";
import { AxiosError } from "axios";

const useSignin = () => {
  const signInMutation = useMutation(postSignIn, {
    onSuccess: (token: string) => {
      localStorage.setItem("token", token); // TODO: remove this after fixing cookie issue on the backend
      window.location.reload();
    },
  });

  const handleSignIn = (phoneNumber: string, loginPasscode: string) => {
    signInMutation.mutate({ phoneNumber, loginPasscode });
  };

  const signInMutationState = useMemo(
    () => ({
      isLoading: signInMutation.isLoading,
      error: signInMutation.error as AxiosError,
      isError: signInMutation.isError,
    }),
    [signInMutation.isLoading, signInMutation.error, signInMutation.isError]
  );

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    defaultValues: {
      acceptTerms: true,
    },
  });

  const handleSubmit = () => {
    return _handleSubmit((data: TSignUpFormValues) => {
      handleSignIn(data.phoneNumber, data.loginPasscode);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (signInMutationState.isError) {
      handleToast("Invalid credentials. Please try again!");
    }
  }, [signInMutationState.isError]);

  return {
    mutationState: signInMutationState,
    errors,
    handleSubmit,
    register,
  };
};

export default useSignin;
