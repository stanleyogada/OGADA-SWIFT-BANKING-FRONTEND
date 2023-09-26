import { useQuery } from "react-query";

import { ENDPOINTS, QUERY_KEYS } from "@constants/services";
import { getUserByPhone } from "@services/users";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";

const PHONE_REGEX = /^[0-9]*$/;

const useSendMoneyInHouse = () => {
  const [phone, setPhone] = useState<string>("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const enabledGetUser = useMemo(() => {
    if (!phone) return false;
    if (phone?.length !== 10) return false;
    if (PHONE_REGEX.test(phone) === false) return false;

    if (phone?.length === 10) return true;
  }, [phone]);

  const { data: user, isLoading: iseUserLoading } = useQuery(
    [QUERY_KEYS.getUserByPhone, enabledGetUser],
    () => getUserByPhone(phone),
    {
      enabled: enabledGetUser,
    }
  );

  return {
    phone,
    iseUserLoading,
    user,
    handlePhoneChange,
  };
};

const SendMoneyInHouse = () => {
  const { phone, iseUserLoading, user, handlePhoneChange } = useSendMoneyInHouse();

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

      {iseUserLoading && <div data-testid="get-user-by-phone-loading">Searching for the user...</div>}
    </>
  );
};

export default SendMoneyInHouse;
