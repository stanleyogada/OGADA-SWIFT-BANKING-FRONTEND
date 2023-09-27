import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getUserByPhone } from "@services/users";
import { postSendMoneyInHouse } from "@services/sendMoney";

const useSendMoneyInHouse = () => {
  const { handleSubmit, register, reset, getValues, watch, setValue } = useForm();

  useEffect(() => {
    watch("recipientAccountNumber");
  }, []);

  const recipientAccountNumber = useMemo(
    () => getValues("recipientAccountNumber"),
    [getValues("recipientAccountNumber")]
  );

  const enabledGetUser = useMemo(() => {
    if (!recipientAccountNumber) return false;
    if (recipientAccountNumber?.length !== 10) return false;
    if (/^[0-9]{10,10}$/.test(recipientAccountNumber) === false) return false;

    return true;
  }, [recipientAccountNumber]);

  const recipient = useQuery(
    [QUERY_KEYS.getUserByPhone, enabledGetUser],
    () => getUserByPhone(recipientAccountNumber),
    {
      enabled: enabledGetUser,
      retry: false,
    }
  );

  const sendMoneyMutation = useMutation(postSendMoneyInHouse, {
    onSuccess: () => {
      // Add a delay to ensure the submit button is still disabled (for testing)
      setTimeout(() => {
        reset();
        setValue("recipientAccountNumber", ""); // Have no idea why the input value is not reset
      }, 5);
    },
  });

  const handleSendMoney = () =>
    handleSubmit(({ amount, remark }) => {
      sendMoneyMutation.mutate({
        amount,
        remark,
        receiverAccountNumber: "1234567890",
        senderAccountType: "234567",
        transferPin: "123456",
      });
    });

  const isSendMoneyButtonDisabled = useMemo(() => {
    if (!enabledGetUser) return true;
    if (recipient.isLoading || recipient.isError || !recipient.data) return true;
    if (sendMoneyMutation.isLoading) return true;

    return false;
  }, [enabledGetUser, recipient.data, recipient.isLoading, recipient.isError, sendMoneyMutation.isLoading]);

  const isRecipientFound = useMemo(() => {
    if (!enabledGetUser) return false;
    if (recipient.isLoading || recipient.isError || !recipient.data) return false;

    return true;
  }, [recipient.data, recipient.isLoading, recipient.isError, enabledGetUser]);

  return {
    recipient,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    isRecipientFound,
    handleSendMoney,
    register,
  };
};

export default useSendMoneyInHouse;
