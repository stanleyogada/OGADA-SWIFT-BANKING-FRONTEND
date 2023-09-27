import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getUserByPhone } from "@services/users";
import { postSendMoneyInHouse } from "@services/sendMoney";

const PHONE_REGEX = /^[0-9]*$/;

const useSendMoneyInHouse = () => {
  const [phone, setPhone] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,

    formState: { errors },
  } = useForm();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const enabledGetUser = useMemo(() => {
    if (!phone) return false;
    if (phone?.length !== 10) return false;
    if (PHONE_REGEX.test(phone) === false) return false;

    if (phone?.length === 10) return true;
  }, [phone]);

  const recipient = useQuery([QUERY_KEYS.getUserByPhone, enabledGetUser], () => getUserByPhone(phone), {
    enabled: enabledGetUser,
  });

  const sendMoneyMutation = useMutation(postSendMoneyInHouse, {
    onSuccess: () => {
      // Add a delay to ensure the submit button is still disabled (for testing)
      setTimeout(() => {
        reset();
        setPhone("");
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

  return {
    phone,
    recipient,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    handlePhoneChange,
    handleSendMoney,
    register,
  };
};

export default useSendMoneyInHouse;
