import Input from "@components/Input";

import ResetPasswordWrapper from "./ResetPasswordWrapper";
import { RESEND_BUTTON_ENABLED_TEXT } from "./hooks/useResetPassword";
import useResetPassword from "./hooks/useResetPassword";

const ResetPassword = () => {
  const { register, handleSubmit, handleResendButtonClick, mutationState, resendDetails, errors } = useResetPassword();

  const renderResendSuffix = () => {
    if (resendDetails.timeSecondsLeft > 0) {
      return `Resend ${resendDetails.timeSecondsLeft}s`;
    }

    return RESEND_BUTTON_ENABLED_TEXT;
  };

  return (
    <ResetPasswordWrapper>
      {mutationState.isError && <div data-testid="error"></div>}

      <h1 className="page-title">Reset Login Passcode</h1>

      <div className="page-sub-title-wrapper">
        <h2 className="page-sub-title">Please enter code</h2>
        <p className="page-sub-title-desc">A verification code has been sent to your email address</p>
      </div>
      <form onSubmit={handleSubmit()}>
        <Input
          placeholder="Enter code"
          {...register("code", {
            required: "Code is required",
            minLength: {
              value: 6,
              message: "Code must be at least 6 characters",
            },
          })}
          error={errors.code?.message}
        />
        <Input
          placeholder="Enter new passcode"
          {...register("newPasscode", {
            required: "New passcode is required",
            pattern: {
              value: /^\d{6}$/,
              message: "New passcode must be 6 digits",
            },
          })}
          error={errors.newPasscode?.message}
        />

        <button
          type="button"
          disabled={resendDetails.timeSecondsLeft > 0}
          onClick={handleResendButtonClick}
          className="resend-button"
        >
          Didn't receive the code? {renderResendSuffix()}
        </button>

        <button className="verify-button" type="submit" disabled={mutationState.isLoading}>
          Verify
          {mutationState.isLoading && <div data-testid="loading"></div>}
        </button>
      </form>
    </ResetPasswordWrapper>
  );
};

export default ResetPassword;
