import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
  // const signUpMutation = useMutation(postSignup, {
  //   onSuccess: () => {
  //     // ...
  //   }
  // });
  // const handleSignUp = ({
  //   phone,
  //   // ..
  //  }: TFormValues) => {
  //   signUpMutation.mutate({
  //      // ..
  //     });
  //  };

  // const signUpMutationState = useMemo(
  //   () => ({
  //     isLoading: signUpMutation.isLoading,
  //     error: signUpMutation.error as AxiosError,
  //     isError: signUpMutation.isError,
  //   }),
  //   [signUpMutation.isLoading, signUpMutation.error, signUpMutation.isError]
  // );

  const { register, handleSubmit: _handleSubmit, formState } = useForm<TFormValues>();

  const handleSubmit = () => {
    return _handleSubmit((data: TFormValues) => {
      // signUpMutation.mutate(...)

      localStorage.setItem(
        "signup-success",
        JSON.stringify({
          // email: data.email,
          email: "test@gmail.com",
          time: new Date().getTime(),
        })
      );
    });
  };

  const handleToast = (message: string) => {
    // toast.error(message, {
    //   position: "top-right",
    // }); // TODO: Fix toast

    alert(message); // TODO: Remove this after fixing toast
  };

  // useEffect(() => {
  //   if (signInMutationState.isError) {
  //     handleToast("Invalid credentials. Please try again!");
  //   }
  // }, [signInMutationState.isError]);

  useEffect(() => {
    if (formState.errors.acceptTerms?.message) {
      handleToast(formState.errors.acceptTerms?.message);
    }
  }, [formState.errors.acceptTerms?.message, formState.submitCount]);

  // TODO: Add useEffect for signUpMutationState.isSuccess
  // call another mutation to send email verification

  return {
    // mutationState: signInMutationState,
    errors: formState.errors,
    handleSubmit,
    register,
  };
};

export default useSignup;
