// import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import useRedirectToHomePage from "../../hooks/useRedirectToHomePage";

// const useSignin = () => {

//   return { token };
// };

const Signin = () => {
  // const { token } = useSignin();
  // useRedirectToHomePage();
  const { token, handleSignin } = useToken();

  return (
    <>
      <div>
        <h1>Sign In</h1>
      </div>

      <div>
        <h2>Simulating a signin</h2>
        <button onClick={handleSignin}>Sign in</button>
      </div>
      {token.isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {token.error && (
        <div>
          <p>Error: {token.error}</p>
        </div>
      )}
      {token.value && (
        <div>
          <p>Token: {token.value}</p>
          <h3>User is signed in, Yey!</h3>
        </div>
      )}
    </>
  );
};

export default Signin;
