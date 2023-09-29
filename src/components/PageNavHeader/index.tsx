import { useNavigate } from "react-router-dom";

import PageNavHeaderWrapper from "./PageNavHeaderWrapper";
import Button from "@components/Button";
import icons from "@constants/icons";
import { TUser } from "@services/users/types";
import { TCredentials } from "@pages/EditAccount";

type TpageNavHeaderProps = {
  heading: string;
  backgroundColor?: string;
  text?: string;
  handler?: () => void;
  data?: TUser | undefined;
  value?: TCredentials;
};

function PageNavHeader({ heading, backgroundColor, text, handler, data, value }: TpageNavHeaderProps) {
  const navigate = useNavigate();

  const isButtonDisabled = () => {
    if (value?.nickname === data?.nickname && value?.email === data?.email) {
      return true;
    }

    return false;
  };
  return (
    <PageNavHeaderWrapper backgroundColor={backgroundColor}>
      <Button onClick={() => navigate(-1)}>{icons.blueLeftArrowIcon()}</Button>
      <h1 className="heading" data-testid="heading">
        {heading}
      </h1>
      {handler && (
        <form onSubmit={handler}>
          <button type="submit" className="text" data-testid="save" disabled={isButtonDisabled()}>
            {text}
          </button>
        </form>
      )}
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
