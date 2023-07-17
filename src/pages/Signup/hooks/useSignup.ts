import { useEffect } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";

type TFormValues = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  loginPasscode: string;
  acceptTerms: boolean;
};

const useSignup = () => {
  const { handleSignIn, signInMutationState } = useAuth();
  const { register, handleSubmit: _handleSubmit, formState } = useForm<TFormValues>();

  const handleSubmit = () => {
    return _handleSubmit((data: TFormValues) => {
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

  useEffect(() => {
    if (formState.errors.acceptTerms?.message) {
      handleToast(formState.errors.acceptTerms?.message);
    }
  }, [formState.errors.acceptTerms?.message, formState.submitCount]);

  return {
    mutationState: signInMutationState,
    errors: formState.errors,
    handleSubmit,
    register,
  };
};

export default useSignup;
