import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import { SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import { QUERY_KEYS } from "@constants/services";
import { getDefaultUserLoginInfo } from "@services/users";
import testLogger from "@utils/testLogger";

import type { TSignInFormValues } from "../type";
import type { UseFormSetValue } from "react-hook-form";

const useSignDefaultFormValues = (setValue: UseFormSetValue<TSignInFormValues>) => {
  const [getSearchParams] = useSearchParams();
  const signinButtonRef = useRef<HTMLButtonElement>(null);
  const [userOption, setUserOption] = useState<null | string>(null);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    const user = getSearchParams.get("user");
    setUserOption(user);
  }, [window.location.search]);

  const shouldFetchDefaultUser = useMemo(() => {
    if (userOption === undefined) return false;
    if (userOption === null) return false;
    if (userOption === "null") return false;
    if (userOption === SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser) return false;

    return true;
  }, [userOption]);

  const {
    data,
    isSuccess,
    isError,
    isLoading: isDefaultUserLoginInfoLoading,
  } = useQuery([QUERY_KEYS.defaultUserLoginInfo, shouldFetchDefaultUser], getDefaultUserLoginInfo, {
    enabled: shouldFetchDefaultUser,
    staleTime: 1000 * 60 * 20, // 20 minutes
  });

  useEffect(() => {
    if (!isError) return;

    alert("Something went wrong Fetching default user login info");
  }, [isError]);

  useEffect(() => {
    if (!shouldFetchDefaultUser) {
      setValue("phoneNumber", "");
      setValue("loginPasscode", "");

      return;
    }

    if (!isSuccess) return;
    if (data === undefined) return;

    setValue("phoneNumber", data.phone);
    setValue("loginPasscode", data.login_passcode);
    setShouldSubmit(true);
  }, [shouldFetchDefaultUser, isSuccess, data]);

  useEffect(() => {
    if (!shouldSubmit) return;

    setTimeout(() => {
      if (process.env.NODE_ENV === "test") {
        testLogger("auto-submit");

        return;
      }

      signinButtonRef.current?.click();
    }, 1);
  }, [shouldSubmit]);

  return { isDefaultUserLoginInfoLoading, signinButtonRef };
};

export default useSignDefaultFormValues;
