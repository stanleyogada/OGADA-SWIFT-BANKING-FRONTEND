import { useMutation } from "react-query";

import { postSendMoneyMobile } from "@services/sendMoney";

import type { AxiosError } from "axios";
import type { TSendMoneyMobileProps } from "@services/sendMoney/types";

const useSendMoneyMobileMutation = (isAirtime: boolean) => {
  const mutation = useMutation(postSendMoneyMobile);

  const handleMutate = (payload: Omit<TSendMoneyMobileProps, "isAirtime">) => {
    mutation.mutate({
      ...payload,
      isAirtime,
    });
  };

  return {
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error as unknown as AxiosError | null,
    handleMutate,
  };
};

export default useSendMoneyMobileMutation;
