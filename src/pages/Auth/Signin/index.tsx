import { Link, useSearchParams } from "react-router-dom";

import useSignin from "./hooks/useSignin";

import SigninWrapper from "./SigninWrapper";
import PhoneInput from "@components/Input/PhoneInput";
import PasswordInput from "@components/Input/PasswordInput";
import Button from "@components/Button";
import PageNavHeader from "@components/PageNavHeader";
import { CLIENT_ROUTES } from "@constants/routes";
import useSigninModal from "./hooks/useSigninModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "@constants/services";
import { getDefaultUserLoginInfo } from "@services/users";
import { UseFormSetValue } from "react-hook-form";
import { TSignInFormValues } from "./type";
import testLogger from "@utils/testLogger";

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

const Signin = () => {
  const { handleSubmit, register, mutationState, errors, setValue } = useSignin();
  useSigninModal();

  const { isDefaultUserLoginInfoLoading, signinButtonRef } = useSignDefaultFormValues(setValue);

  return (
    <SigninWrapper>
      {mutationState.isError && <p data-testid="error"></p>}

      <PageNavHeader heading="Sign in" />

      <main className="content">
        <h2 className="sub-title">Welcome Back!</h2>

        <form onSubmit={handleSubmit()} className="form">
          <div className="form__input-list">
            <PhoneInput
              placeholder="Phone Number"
              required
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              error={errors.phoneNumber?.message}
            />
            <PasswordInput
              placeholder="Enter 6 digits login passcode"
              required
              {...register("loginPasscode", {
                required: "Login passcode is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Login passcode must be 6 digits",
                },
              })}
              error={errors.loginPasscode?.message}
            />
          </div>

          <div className="form__actions">
            <div className="form__actions-top">
              <label htmlFor="remember-login-passcode" className="form__checkbox">
                <input type="checkbox" id="remember-login-passcode" />
                Remember login passcode
              </label>

              <Link to={CLIENT_ROUTES.authForgetPasscode} className="form__link">
                Forgot login passcode?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={mutationState.isLoading}
              className="form__actions-bottom"
              ref={signinButtonRef}
            >
              Sign In
              {mutationState.isLoading && <p data-testid="loading"></p>}
              {isDefaultUserLoginInfoLoading && <p data-testid="default-user-loading"></p>}
            </Button>

            <Link to="/auth/signup" className="form__link">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </main>
    </SigninWrapper>
  );
};

export default Signin;
