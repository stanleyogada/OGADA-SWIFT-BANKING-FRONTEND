import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

type TFormData = {
  phoneNumber: string;
  loginPasscode: string;
};

const Signin = () => {
  const { handleSignIn, signInMutationState } = useAuth();

  const [formData, setFormData] = useState<TFormData>({
    phoneNumber: "",
    loginPasscode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn(formData.phoneNumber, formData.loginPasscode);
  };

  return (
    <div>
      <h1>Sign In</h1>

      <h2>Welcome Back</h2>

      {signInMutationState.isLoading && <p data-testid="loading">submitting form ...</p>}

      {signInMutationState.isError && <p data-testid="error">Invalid credentials. Please try again!</p>}

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

          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
