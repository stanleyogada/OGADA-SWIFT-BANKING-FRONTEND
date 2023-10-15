import { patchPasscode, patchPin } from "@services/users";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";

const useChangePin = (passConfig: { oldPin: string; newPin: string }) => {
  const { register, handleSubmit } = useForm();
  const updatePinMutation = useMutation(patchPin);

  const handleFormSubmit = () => {
    return handleSubmit(() => {
      updatePinMutation.mutate(passConfig);
    });
  };

  return {
    register,
    handleFormSubmit,
    updatePinMutation,
  };
};

export default useChangePin;
