import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CLIENT_ROUTES, SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import testLogger from "@utils/testLogger";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

import SigninModalWrapper from "./SigninModalWrapper";

const SigninModal = () => {
  const { handleRemove } = useModalConsumer();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<undefined | string>();

  const handleClick = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (value === undefined) return;

    if (value === "null") {
      testLogger(CLIENT_ROUTES.authSignup);
      location.href = CLIENT_ROUTES.authSignup;

      return;
    }

    testLogger("setSearchParams", "user", value);
    setSearchParams({
      user: value,
    });

    handleRemove();
  }, [value]);

  return (
    <SigninModalWrapper>
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
