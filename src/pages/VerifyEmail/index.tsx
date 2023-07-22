import Input from "../../components/Input";
import VerifyEmailWrapper from "./VerifyEmailWrapper";
import useVerifyEmail from "./hooks/useVerifyEmail";

const VerifyEmail = () => {
  const { register, handleSubmit, mutationState } = useVerifyEmail();

  return (
    <VerifyEmailWrapper>
      <h1 className="page-title">Verify email address</h1>

      <form>
        <Input placeholder="Enter code" />

        <button type="submit">Verify</button>
      </form>
    </VerifyEmailWrapper>
  );
};

export default VerifyEmail;
