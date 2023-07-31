import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { postForgetPassword } from "@services/auth";
import { AxiosError } from "axios";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "@constants/index";
import { TForgetLoginPasscode } from "../type";

const useForgetPasscode = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TForgetLoginPasscode>();

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.sendForgetPasscodeOTPSuccess);
    const phone: string = data ? JSON.parse(data).phone : "";
    const email: string = data ? JSON.parse(data).email : "";

    if (phone) setValue("phone", phone);
    if (email) setValue("email", email);
  }, []);

  const forgetPasscodeMutation = useMutation(postForgetPassword, {
    onSuccess: () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.sendForgetPasscodeOTPSuccess,
        JSON.stringify({
          phone: getValues().phone,
          email: getValues().email,
          savedAtTime: Date.now(),
        })
      );
      navigate(CLIENT_ROUTES.authResetPasscode);
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

export default useForgetPasscode;
