import { useEffect, useState } from "react";
import SigninModalWrapper from "./SigninModalWrapper";
import { CLIENT_ROUTES, SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import { useNavigate, useSearchParams } from "react-router-dom";

const SigninModal = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<undefined | string>();

  const handleClick = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (value === undefined) return;

    if (value === "null") {
      navigate(CLIENT_ROUTES.authSignup);

      return;
    }

    console.info("setSearchParams", "user", value);
    setSearchParams({
      user: value,
    });
  }, [value]);

  return (
    <SigninModalWrapper>
      <h1>SigninModal</h1>

      <form>
        <div data-testid="radio" onClick={() => handleClick(SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.defaultUser)}>
          <p>Default</p>
        </div>

        <div data-testid="radio" onClick={() => handleClick(SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser)}>
          <p>No User</p>
        </div>

        <div data-testid="radio" onClick={() => handleClick("null")}>
          <p>Create User</p>
        </div>
      </form>
    </SigninModalWrapper>
  );
};

export default SigninModal;
