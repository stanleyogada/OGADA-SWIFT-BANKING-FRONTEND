import { useNavigate } from "react-router-dom";

import PageNavHeaderWrapper from "./PageNavHeaderWrapper";
import Button from "@components/Button";
import icons from "@constants/icons";

type TpageNavHeaderProps = {
  heading: string;
  backgroundColor?: string;
  text?: string;
  handler?: () => void;
};

function PageNavHeader({ heading, backgroundColor, text, handler }: TpageNavHeaderProps) {
  const navigate = useNavigate();
  return (
    <PageNavHeaderWrapper backgroundColor={backgroundColor}>
      <Button onClick={() => navigate(-1)}>{icons.blueLeftArrowIcon()}</Button>

      <h1 className="heading" data-testid="heading">
        {heading}
      </h1>
      {handler && (
        <form onSubmit={handler}>
          <button type="submit" className="text" data-testid="save">
            {text}
          </button>
        </form>
      )}
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
