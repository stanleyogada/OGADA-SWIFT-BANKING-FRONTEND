import Button from "../../components/Button";
import Input from "../../components/Input";
import VerifyEmailWrapper from "./VerifyEmailWrapper";
import useVerifyEmail from "./hooks/useVerifyEmail";

const VerifyEmail = () => {
  const { register, handleSubmit, mutationState, resendDetails } = useVerifyEmail();

  const renderResendSuffix = () => {
    if (resendDetails.timeSecondsLeft > 0) {
      return `Resend ${resendDetails.timeSecondsLeft}s`;
    }

    return "You can resend now!";
  };

  return (
    <VerifyEmailWrapper>
      {mutationState.isError && <div data-testid="error"></div>}

      <h1 className="page-title">Verify email address</h1>

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
        />

        <Button type="button" disabled={resendDetails.timeSecondsLeft > 0}>
          Didn't receive the code? {renderResendSuffix()}
        </Button>

        <Button type="submit" disabled={mutationState.isLoading}>
          Verify
          {mutationState.isLoading && <div data-testid="loading">Loading...</div>}
        </Button>
      </form>
    </VerifyEmailWrapper>
  );
};

export default VerifyEmail;
