
import Input from "@components/Input";
import PhoneInput from "@components/Input/PhoneInput";

import ForgetPasswordWrapper from "./ForgetPasswordWrapper";
import useForgetPasscode from "./hooks/useForgetPasscode";

const ForgetPassword = () => {
  const { register, handleSubmit, mutationState, errors } = useForgetPasscode();

  return (
    <ForgetPasswordWrapper>
      {mutationState.isError && <div data-testid="error"></div>}
      <h1 className="page-title">Forgot Password</h1>

      <div className="page-sub-title-wrapper">
        <h2 className="page-sub-title">Please enter your Email</h2>
        <p className="page-sub-title-desc">An OTP will be sent to your email address</p>
      </div>
      <form onSubmit={handleSubmit()}>
        <PhoneInput
          label="Phone Number"
          required
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
          error={errors.phone?.message}
          info=""
        />

        <Input
          label="Email"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is invalid",
            },
          })}
          error={errors.email?.message}
          info="OTP will be sent to your email address"
        />

        <button className="verify-button" type="submit" disabled={mutationState.isLoading}>
          Send
          {mutationState.isLoading && <div data-testid="loading"></div>}
        </button>
      </form>
    </ForgetPasswordWrapper>
  );
};

export default ForgetPassword;
