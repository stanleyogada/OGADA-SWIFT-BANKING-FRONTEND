import { patchPasscode } from "@services/users";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";

const useChangePasscode = (passConfig: { oldPasscode: string; newPasscode: string }) => {
  const { register, handleSubmit } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setIsError] = useState(false);
  const updatePassCodeMutation = useMutation(patchPasscode);

  const handleFormSubmit = () => {
    return handleSubmit(() => {
      updatePassCodeMutation.mutate(passConfig);
    });
  };

  return {
    register,
    handleFormSubmit,
    updatePassCodeMutation,
  };
};

export default useChangePasscode;
