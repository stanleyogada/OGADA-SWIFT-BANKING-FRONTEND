import { Link } from "react-router-dom";

import PhoneInput from "@components/Input/PhoneInput";
import PasswordInput from "@components/Input/PasswordInput";
import Button from "@components/Button";
import PageNavHeader from "@components/PageNavHeader";
import { CLIENT_ROUTES } from "@constants/routes";

import useSignin from "./hooks/useSignin";
import SigninWrapper from "./SigninWrapper";
import useSigninModal from "./hooks/useSigninModal";
import useSignDefaultFormValues from "./hooks/useSignDefaultFormValues";

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
