import { useForm } from "react-hook-form";
import { TResendEmailFormValues } from "../type";
import { postSendEmail } from "../../../../services/auth";
import { useMutation } from "react-query";
import { useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../../constants";
import useSendEmailCodeSuccess from "../../../../hooks/useSendEmailCodeSuccess";

const useResendEmail = () => {
  const navigate = useNavigate();
  const handleSendEmailCodeSuccess = useSendEmailCodeSuccess();

  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TResendEmailFormValues>();

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.sendEmailCodeSuccess);
    const email: string = data ? JSON.parse(data).email : "";

    if (email) {
      setValue("email", email);
    }
  }, []);

  const resendEmailMutation = useMutation(postSendEmail, {
    onSuccess: () => {
      handleSendEmailCodeSuccess(getValues().email);
      navigate(CLIENT_ROUTES.authVerifyEmail);
    },
  });

  const handleSubmit = () => {
    return _handleSubmit(async (values) => {
      resendEmailMutation.mutate(values.email);
    });
  };

  const mutationState = useMemo(() => {
    const error = resendEmailMutation.error as AxiosError;
    let message = (error?.response?.data as { message: string })?.message;

    return {
      isLoading: resendEmailMutation.isLoading,
      error: message,
      isError: resendEmailMutation.isError,
    };
  }, [resendEmailMutation.isLoading, resendEmailMutation.error, resendEmailMutation.isError]);

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
    register,
    handleSubmit,
    errors,
    mutationState,
  };
};

export default useResendEmail;
