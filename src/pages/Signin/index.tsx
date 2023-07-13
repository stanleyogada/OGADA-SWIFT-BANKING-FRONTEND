import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { CLIENT_ROUTES } from "../../constants";

const Signin = () => {
  const { handleSignIn, signInMutationState } = useAuth();

  return (
    <div>
      <h1>Sign In</h1>

      <h2>Welcome Back</h2>

      <form>
        <input type="text" placeholder="Phone Number" />
        <input type="password" placeholder="Enter 6 digits login passcode" />

        <div>
          <label htmlFor="remember-login-passcode">
            <input type="checkbox" id="remember-login-passcode" />
            Remember login passcode
          </label>

          <Link to="#">Forgot login passcode?</Link>

          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
