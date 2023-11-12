import { Link } from "react-router-dom";

import useSignup from "./hooks/useSignup";

import SignupWrapper from "./SignupWrapper";

import Input from "@components/Input";
import PhoneInput from "@components/Input/PhoneInput";
import PasswordInput from "@components/Input/PasswordInput";
import Button from "@components/Button";
import PageNavHeader from "@components/PageNavHeader";

const Signup = () => {
  const { handleSubmit, register, mutationState, errors } = useSignup();

  return (
    <SignupWrapper>
      {mutationState.isError && <p data-testid="error">{mutationState.error}</p>}

      <PageNavHeader heading="Create a new account" />

      <main className="content">
        <form onSubmit={handleSubmit()} className="form">
          <div className="form__input-list">
            <Input
              label="First Name"
              required
              {...register("firstName", {
                required: "First Name is required",
                minLength: { value: 3, message: "First Name must be 3 digits or more" },
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              required
              {...register("lastName", {
                required: "Last Name is required",
                minLength: { value: 3, message: "Last Name must be 3 digits or more" },
              })}
              error={errors.lastName?.message}
            />
            <Input
              label="Middle Name"
              {...register("middleName", {
                minLength: { value: 3, message: "Middle Name must be 3 digits or more" },
              })}
              error={errors.middleName?.message}
            />
            <Input
              label="Email"
              type="email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              error={errors.email?.message}
            />
            <PhoneInput
              label="Phone Number"
              required
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              error={errors.phoneNumber?.message}
              info="This would be your account number"
            />
            <PasswordInput
              label="Enter 6 digits login passcode"
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

            <PasswordInput
              label="Transfer Pin"
              required
              {...register("transferPin", {
                required: "Transfer Pin is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Transfer Pin must be 4 digits",
                },
              })}
              error={errors.transferPin?.message}
            />
          </div>

          <div className="form__actions">
            <div className="form__actions-top">
              <label htmlFor="click-to-confirm" className="form__checkbox">
                <input
                  type="checkbox"
                  role="checkbox"
                  id="click-to-confirm"
                  {...register("acceptTerms", {
                    required: "You must confirm",
                  })}
                />
                Click “Confirm” to accept&nbsp;
              </label>

              <Link to="#" className="form__link">
                Terms and Conditions.
              </Link>
            </div>

            <Button type="submit" disabled={mutationState.isLoading} className="form__actions-bottom">
              Confirm
              {mutationState.isLoading && <p data-testid="loading"></p>}
            </Button>

            <Link to="/auth/signin" className="form__link">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </main>
    </SignupWrapper>
  );
};

export default Signup;
