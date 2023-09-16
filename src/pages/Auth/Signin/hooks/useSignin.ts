import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useAuth from "@hooks/useAuth";

import { TSignInFormValues } from "../type";

const useSignin = () => {
  const { handleSignIn, signInMutationState } = useAuth();
  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSignInFormValues>();

  const handleSubmit = () => {
    return _handleSubmit((data: TSignInFormValues) => {
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
      handleToast(signInMutationState.error);
    }
  }, [signInMutationState.isError, signInMutationState.error]);

  return {
    mutationState: signInMutationState,
    errors,
    handleSubmit,
    register,
    setValue,
  };
};

export default useSignin;
