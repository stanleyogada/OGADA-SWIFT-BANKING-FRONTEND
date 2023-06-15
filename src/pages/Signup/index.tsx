import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";

const Signup = () => {
  return (
    <>
      <div>
        <h1>Sign UP</h1>

        <div>
          <Link to={CLIENT_ROUTES.authSignin}>Go Signin</Link>
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
    </>
  );
};

export default Signup;
