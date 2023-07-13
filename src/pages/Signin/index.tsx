import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { CLIENT_ROUTES } from "../../constants";

const Signin = () => {
  const { handleSignIn, signInMutationState } = useAuth();

  return (
    <>
      <div>
        <h1>Sign In</h1>

        <div>
          <Link to={CLIENT_ROUTES.authSignup}>Go Signup</Link>
        </div>

        <div>
          <Link to={CLIENT_ROUTES.authWelcome}>Go Welcome</Link>
        </div>

        <div>
          <Link to={CLIENT_ROUTES.about}>Go About</Link>
        </div>

        <div>
          <Link to={CLIENT_ROUTES.home}>Go Home</Link>
        </div>
      </div>

      <div>
        <h2>Simulate a Sign In</h2>
        <button onClick={() => handleSignIn("9012345678", "654321")}>Sign in</button>
      </div>
      <>
        {signInMutationState.isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}

        {signInMutationState.isError && (
          <div>
            <p>Error: {signInMutationState.error.message}</p>
          </div>
        )}
      </>
    </>
  );
};

export default Signin;
