import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { postSendEmail, postSignup } from "../../../services/auth";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";

import type { TSignUpFormValues } from "../type";
import { AxiosError } from "axios";

const useSignup = () => {
  const {
    register,
    handleSubmit: _handleSubmit,
    formState,
  } = useForm<TSignUpFormValues>({
    defaultValues: {
      firstName: "Test",
      lastName: "User",
      middleName: "Mid guy",
      email: "test@gmail.com",
      phoneNumber: "1234567890",
      loginPasscode: "123456",
      acceptTerms: true,
    },
  });

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

  const signUpMutationState = useMemo(
    () => ({
      isLoading: signUpMutation.isLoading,
      error: signUpMutation.error as AxiosError,
      isError: signUpMutation.isError,
    }),
    [signUpMutation.isLoading, signUpMutation.error, signUpMutation.isError]
  );

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
      handleToast("Invalid credentials. Please try again!");
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
