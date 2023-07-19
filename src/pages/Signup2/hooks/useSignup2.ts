import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";

import type { TSignUpFormValues } from "../type";

const useSignin = () => {
  const { handleSignIn, signInMutationState } = useAuth();
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
