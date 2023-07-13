import { useState } from "react";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

const useCustomMutation = (
  mutationFn: MutationFunction<any, unknown>,
  options?: UseMutationOptions<any, unknown, unknown, void> | undefined
) => {
  const [mutationIsLoading, setMutationIsLoading] = useState(false);

  const mutation = useMutation(mutationFn, {
    ...options,
    onMutate: (variables: unknown) => {
      setMutationIsLoading(true);

      options?.onMutate?.(variables);
    },
    onSettled: (data: unknown, error: unknown, variables: unknown) => {
      setMutationIsLoading(false);

      options?.onSettled?.(data, error, variables);
    },
  });

  return {
    ...mutation,
    isLoading: mutationIsLoading,
  };
};

export default useCustomMutation;
