import { useEffect, useState } from "react";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

const useCustomMutation = <T>(
  mutationFn: MutationFunction<any, T>,
  options?: UseMutationOptions<any, unknown, unknown, void> | undefined
) => {
  const [mutationIsLoading, setMutationIsLoading] = useState(false);

  const mutation = useMutation(mutationFn, {
    ...options,
    onMutate: (variables: unknown) => {
      setMutationIsLoading(true);

      options?.onMutate?.(variables);
    },
  });

  useEffect(() => {
    setMutationIsLoading(false);
  }, [mutation.isSuccess]);

  useEffect(() => {
    console.log("isLoading", mutationIsLoading);
  }, [mutationIsLoading]);

  return {
    ...mutation,
    isLoading: mutationIsLoading,
  };
};

export default useCustomMutation;
