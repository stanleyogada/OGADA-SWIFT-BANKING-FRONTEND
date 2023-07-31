import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { postForgetPassword } from "../../../../services/auth";
import { AxiosError } from "axios";
import { CLIENT_ROUTES } from "../../../../constants";
import { TForgetLoginPasscode } from "../type";

const useForgetPassCode = () => {
  const navigate = useNavigate();
  const forgetPasscodeMutation = useMutation(postForgetPassword, {
    onSuccess: () => {
      navigate(CLIENT_ROUTES.authSignin);
    },
  });

  const handleForgetPassword = (formValues: TForgetLoginPasscode) => {
    forgetPasscodeMutation.mutate(formValues);
  };

  const mutationState = useMemo(() => {
    const error = forgetPasscodeMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: forgetPasscodeMutation.isLoading,
      error: message,
      isError: forgetPasscodeMutation.isError,
    };
  }, [forgetPasscodeMutation.isLoading, forgetPasscodeMutation.error, forgetPasscodeMutation.isError]);

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TForgetLoginPasscode>();

  const handleSubmit = () => {
    return _handleSubmit((formValues: TForgetLoginPasscode) => {
      handleForgetPassword(formValues);
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  useEffect(() => {
    if (mutationState.isError) {
      handleToast(mutationState.error);
    }
  }, [mutationState.isError, mutationState.error]);

  return {
    mutationState,
    errors,
    handleSubmit,
    register,
  };
};

export default useForgetPassCode;
