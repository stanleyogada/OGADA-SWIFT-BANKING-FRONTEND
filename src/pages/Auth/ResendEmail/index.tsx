import Input from "src/components/Input";
import ResendEmailWrapper from "./ResendEmailWrapper";
import useResendEmail from "./hooks/useResendEmail";

const ResendEmail = () => {
  const { register, handleSubmit, errors, mutationState } = useResendEmail();

  return (
    <ResendEmailWrapper>
      {mutationState.isError && <div data-testid="error"></div>}

      <h1 className="page-title">Resend email verification</h1>
      <h2 className="page-sub-title">Manually send email verification code</h2>

      <form onSubmit={handleSubmit()}>
        <Input
          placeholder="Enter email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          })}
          error={errors.email?.message}
        />

        <button className="send-button" type="submit" disabled={mutationState.isLoading}>
          Send
          {mutationState.isLoading && <div data-testid="loading"></div>}
        </button>
      </form>
    </ResendEmailWrapper>
  );
};

export default ResendEmail;
