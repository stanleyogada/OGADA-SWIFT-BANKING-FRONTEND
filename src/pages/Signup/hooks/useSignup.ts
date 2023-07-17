import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";

type TFormValues = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  loginPasscode: string;
};

const useSignup = () => {
  const { handleSignIn, signInMutationState } = useAuth();
  const {
    register,
    handleSubmit: _handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const handleSubmit = () => {
    return _handleSubmit((data: TFormValues) => {
      handleSignIn(data.phoneNumber, data.loginPasscode);
    });
  };

  useEffect(() => {
    const handleToast = (message: string) => {
      toast.error(message, {
        position: "top-right",
      });
    };

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

export default useSignup;
