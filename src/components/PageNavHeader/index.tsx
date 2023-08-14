import { useNavigate } from "react-router-dom";

import PageNavHeaderWrapper from "./PageNavHeaderWrapper";
import Button from "@components/Button";
import icons from "@constants/icons";

type TpageNavHeaderProps = {
  heading: string;
  backgroundColor?: string;
};

function PageNavHeader({ heading, backgroundColor }: TpageNavHeaderProps) {
  const navigate = useNavigate();
  return (
    <PageNavHeaderWrapper backgroundColor={backgroundColor}>
      <Button onClick={() => navigate(-1)}>{icons.blueLeftArrowIcon()}</Button>

      <h1 className="heading" data-testid="heading">
        {heading}
      </h1>
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
