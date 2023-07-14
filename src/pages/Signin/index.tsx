import { Link } from "react-router-dom";
import useSignin from "./hooks/useSignin";
import SigninWrapper from "./SigninWrapper";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PhoneInput from "../../components/Input/PhoneInput";

const Signin = () => {
  const { handleInputChange, handleSubmit, signInMutationState, formData } = useSignin();

  return (
    <SigninWrapper>
      {signInMutationState.isError && <p data-testid="error"></p>}

      <header>
        <h1 className="page-title">Sign In</h1>
      </header>

      <main className="content">
        <h2 className="sub-title">Welcome Back!</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form__input-list">
            <PhoneInput
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInputChange}
              value={formData.phoneNumber}
            />
            <Input
              type="password"
              placeholder="Enter 6 digits login passcode"
              name="loginPasscode"
              onChange={handleInputChange}
              value={formData.loginPasscode}
            />
          </div>

          <div className="form__actions">
            <div className="form__actions-top">
              <label htmlFor="remember-login-passcode" className="form__checkbox">
                <input type="checkbox" id="remember-login-passcode" />
                Remember login passcode
              </label>

              <Link to="#" className="form__link">
                Forgot login passcode?
              </Link>
            </div>

            <Button type="submit" disabled={signInMutationState.isLoading} className="form__actions-bottom">
              Sign In
              {signInMutationState.isLoading && <p data-testid="loading"></p>}
            </Button>
          </div>
        </form>
      </main>
    </SigninWrapper>
  );
};

export default Signin;
