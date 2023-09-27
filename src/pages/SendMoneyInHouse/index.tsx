import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "@constants/services";
import { getUserByPhone } from "@services/users";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
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

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery([QUERY_KEYS.getUserByPhone, enabledGetUser], () => getUserByPhone(phone), {
    enabled: enabledGetUser,
  });

  const sendMoneyMutation = useMutation(postSendMoneyInHouse, {
    onSuccess: () => {
      setTimeout(() => {
        // Add a delay to ensure the submit button is still disabled (for testing)
        reset();
        setPhone("");
      }, 2);
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
    if (isUserLoading || isUserError || !user) return true;
    if (sendMoneyMutation.isLoading) return true;

    return false;
  }, [enabledGetUser, user, isUserLoading, isUserError, sendMoneyMutation.isLoading]);

  return {
    phone,
    isUserLoading,
    user,
    isSendMoneyButtonDisabled,
    sendMoneyMutation,
    handlePhoneChange,
    handleSendMoney,
    register,
  };
};

const SendMoneyInHouse = () => {
  const {
    phone,
    isUserLoading,
    user,
    isSendMoneyButtonDisabled,
    handlePhoneChange,
    handleSendMoney,
    register,
    sendMoneyMutation,
  } = useSendMoneyInHouse();

  return (
    <>
      <input type="text" placeholder="Phone" value={phone} onChange={handlePhoneChange} />

      {user && (
        <div data-testid="user-block">
          <p data-testid="user-full-name">
            {user?.first_name} {user?.last_name}
          </p>

          <p>{user?.phone}</p>

          <img src={user?.avatar} alt="avatar" />
        </div>
      )}

      <form onSubmit={handleSendMoney()}>
        <input
          type="text"
          placeholder="Amount"
          {...register("amount", {
            required: true,
            min: 3,
          })}
        />
        <input
          type="text"
          placeholder="Note"
          {...register("remark", {
            required: true,
            min: 3,
          })}
        />

        <button type="submit" disabled={isSendMoneyButtonDisabled}>
          Send money
          {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading">Sending money...</div>}
        </button>
      </form>

      {isUserLoading && <div data-testid="get-user-by-phone-loading">Searching for the user...</div>}
    </>
  );
};

export default SendMoneyInHouse;
