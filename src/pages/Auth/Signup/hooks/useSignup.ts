import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { CLIENT_ROUTES } from "@constants/routes";

import useSendEmailCodeSuccess from "@hooks/useSendEmailCodeSuccess";

import { postSignup } from "@services/auth";

import { TSignUpFormValues } from "../type";

const useSignup = () => {
  const navigate = useNavigate();
  const handleSendEmailCodeSuccess = useSendEmailCodeSuccess();

  const signUpMutation = useMutation(postSignup, {
    onSuccess: ({ email }) => {
      handleSendEmailCodeSuccess(email);
      navigate(CLIENT_ROUTES.authVerifyEmail);
    },
  });

  const handleSignup = (formValues: TSignUpFormValues) => {
    signUpMutation.mutate(formValues);
  };

  const signUpMutationState = useMemo(() => {
    const error = signUpMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: signUpMutation.isLoading,
      error: message,
      isError: signUpMutation.isError,
    };
  }, [signUpMutation.isLoading, signUpMutation.error, signUpMutation.isError]);

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormValues>({
    defaultValues: {
      acceptTerms: true,

      ...(() =>
        process.env.NODE_ENV === "development"
          ? {
              firstName: "John",
              lastName: "Doe",
              email: "johnDoe@gmail.com",
              phoneNumber: "9234567890",
              loginPasscode: "123456",
              transferPin: "1234",
            }
          : {})(),
    },
  });

  const handleSubmit = () => {
    return _handleSubmit((formValues: TSignUpFormValues) => {
      if (!formValues.middleName) {
        delete formValues.middleName;
      }

      handleSignup(formValues);
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
      handleToast(signUpMutationState.error);
    }
  }, [signUpMutationState.isError, signUpMutationState.error]);

  return {
    mutationState: signUpMutationState,
    errors,
    handleSubmit,
    register,
  };
};

export default useSignup;
