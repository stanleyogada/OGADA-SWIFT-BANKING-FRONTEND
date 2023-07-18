import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { postSendEmail, postSignup } from "../../../services/auth";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";

import type { TSignUpFormValues } from "../type";
import { AxiosError } from "axios";

const useSignup = () => {
  const { register, handleSubmit: _handleSubmit, formState } = useForm<TSignUpFormValues>({});

  const navigate = useNavigate();
  const sendEmailMutation = useMutation(postSendEmail, {
    onSuccess: (email) => {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.signupSuccess,
        JSON.stringify({
          email,
          time: new Date().getTime(),
        })
      );

      navigate(CLIENT_ROUTES.authEmail);
    },
  });

  const signUpMutation = useMutation(postSignup, {
    onSuccess: ({ email }) => {
      sendEmailMutation.mutate(email);
    },
  });

  const signUpMutationState = useMemo(() => {
    const { isLoading, error, isError } = signUpMutation;
    const { isLoading: isSendEmailLoading, error: sendEmailError, isError: isSendEmailError } = sendEmailMutation;

    return {
      isLoading: isLoading || isSendEmailLoading,
      error: (error || sendEmailError) as AxiosError | undefined,
      isError: isError || isSendEmailError,
    };
  }, [
    signUpMutation.isLoading,
    signUpMutation.error,
    signUpMutation.isError,
    sendEmailMutation.isLoading,
    sendEmailMutation.error,
    sendEmailMutation.isError,
  ]);

  const handleSubmit = () => {
    return _handleSubmit((data: TSignUpFormValues) => {
      signUpMutation.mutate(data);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (signUpMutationState.isError) {
      const error = (signUpMutationState.error?.response?.data as { message: string })?.message;

      handleToast(error || "Something went wrong");
    }
  }, [signUpMutationState.isError]);

  useEffect(() => {
    if (formState.errors.acceptTerms?.message) {
      handleToast(formState.errors.acceptTerms?.message);
    }
  }, [formState.errors.acceptTerms?.message, formState.submitCount]);

  return {
    mutationState: signUpMutationState,
    errors: formState.errors,
    handleSubmit,
    register,
  };
};

export default useSignup;
