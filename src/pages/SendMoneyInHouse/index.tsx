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

const SendMoneyInHouse = () => {
  const {
    phone,
    recipient,
    sendMoneyMutation,
    isSendMoneyButtonDisabled,
    handlePhoneChange,
    handleSendMoney,
    register,
  } = useSendMoneyInHouse();

  return (
    <>
      <input type="text" placeholder="Phone" value={phone} onChange={handlePhoneChange} />

      {recipient.data && (
        <div data-testid="user-block">
          <p data-testid="user-full-name">
            {recipient.data?.first_name} {recipient.data?.last_name}
          </p>

          <p>{recipient.data?.phone}</p>

          <img src={recipient.data?.avatar} alt="avatar" />
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

        {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
        {sendMoneyMutation.isSuccess && <div data-testid="send-money-success">Money sent successfully</div>}
      </form>

      {recipient.isError && <div data-testid="get-user-by-phone-error">Error searching for the user</div>}
      {recipient.isLoading && <div data-testid="get-user-by-phone-loading">Searching for the user...</div>}
    </>
  );
};

export default SendMoneyInHouse;
