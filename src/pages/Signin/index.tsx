import { Link } from "react-router-dom";
import useSignin from "./hooks/useSignin";

const Signin = () => {
  const { handleInputChange, handleSubmit, signInMutationState, formData } = useSignin();

  return (
    <div>
      <h1>Sign In</h1>

      <h2>Welcome Back</h2>

      {signInMutationState.isLoading && <p data-testid="loading"></p>}
      {signInMutationState.isError && <p data-testid="error"></p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          onChange={handleInputChange}
          value={formData.phoneNumber}
        />
        <input
          type="password"
          placeholder="Enter 6 digits login passcode"
          name="loginPasscode"
          onChange={handleInputChange}
          value={formData.loginPasscode}
        />

        <div>
          <label htmlFor="remember-login-passcode">
            <input type="checkbox" id="remember-login-passcode" />
            Remember login passcode
          </label>

          <Link to="#">Forgot login passcode?</Link>

          <button type="submit" disabled={signInMutationState.isLoading}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
