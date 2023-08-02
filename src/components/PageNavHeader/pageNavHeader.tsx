import { useNavigate } from "react-router-dom";

import PageNavHeaderWrapper from "./PageNavHeaderWrapper";
import icons from "@constants/icons";

type TpageNavHeaderProps = {
  heading: string;
  backgroundColor: string;
};

function PageNavHeader({ heading, backgroundColor }: TpageNavHeaderProps) {
  const navigate = useNavigate();
  return (
    <PageNavHeaderWrapper backgroundColor={backgroundColor}>
      <div title="left-caret">
        <div data-testid="icon" onClick={() => navigate(-1)}>
          {icons.blueLeftArrowIcon()}
        </div>
        <div className="heading" data-testid="heading">
          {heading}
        </div>
      </div>
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
