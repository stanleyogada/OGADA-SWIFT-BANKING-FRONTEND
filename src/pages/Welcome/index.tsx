import React from "react";
import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants/routes";

import useRedirectToHomePage from "../../hooks/useRedirectToHomePage";

const Welcome = () => {
  // useRedirectToAuthPage();

  return (
    <div>
      <h1>Welcome</h1>

      <div>
        <Link to={CLIENT_ROUTES.authSignin}>Signin</Link>
      </div>
      <div>
        <Link to={CLIENT_ROUTES.authSignup}>Signup</Link>
      </div>
    </div>
  );
};

export default Welcome;
