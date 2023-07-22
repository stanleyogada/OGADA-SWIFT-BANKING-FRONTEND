import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { postVerifyEmail } from "../../../services/auth";
import { AxiosError } from "axios";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";
import { TVerifyEmailFormValues } from "../type";

const useVerifyEmail = () => {
  const navigate = useNavigate();
  const VerifyEmailMutation = useMutation(postVerifyEmail, {
    onSuccess: () => {
      navigate(CLIENT_ROUTES.authSignin);
    },
  });

  const handleVerifyEmail = (formValues: TVerifyEmailFormValues) => {
    VerifyEmailMutation.mutate(formValues.code);
  };

  const VerifyEmailMutationState = useMemo(() => {
    const error = VerifyEmailMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: VerifyEmailMutation.isLoading,
      error: message,
      isError: VerifyEmailMutation.isError,
    };
  }, [VerifyEmailMutation.isLoading, VerifyEmailMutation.error, VerifyEmailMutation.isError]);

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TVerifyEmailFormValues>();

  const handleSubmit = () => {
    return _handleSubmit((formValues: TVerifyEmailFormValues) => {
      handleVerifyEmail(formValues);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (VerifyEmailMutationState.isError) {
      handleToast("Invalid credentials. Please try again!");
    }
  }, [VerifyEmailMutationState.isError]);

  return {
    mutationState: VerifyEmailMutationState,
    errors,
    handleSubmit,
    register,
  };
};

export default useVerifyEmail;
