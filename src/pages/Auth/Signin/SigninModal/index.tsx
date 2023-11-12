import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CLIENT_ROUTES, SIGNIN_MODAL_URL_USER_QUERY_OPTIONS } from "@constants/index";
import testLogger from "@utils/testLogger";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

import SigninModalWrapper from "./SigninModalWrapper";

const DATA = [
  {
    id: 1,
    name: "Test User (Login)",
    info: "No need for sign in, Use a default user to sign in without the need of creating a new user.",
    value: SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.defaultUser,
  },
  {
    id: 2,
    name: "Login",
    info: "Use a user that does exist to sign in.",
    value: SIGNIN_MODAL_URL_USER_QUERY_OPTIONS.noUser,
  },
  {
    id: 3,
    name: "Register",
    info: "Create a new user and sign in.",
    value: "null",
  },
];

const SigninModal = () => {
  const { handleRemove } = useModalConsumer();
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
      {DATA.map((item) => (
        <div key={item.id} data-testid="radio" onClick={() => handleClick(item.value)} className="signin-modal__radio">
          <p className={"signin-modal__radio-name"}>{item.name}</p>
          <p className={"signin-modal__radio-info"}>{item.info}</p>
        </div>
      ))}
    </SigninModalWrapper>
  );
};

export default SigninModal;
