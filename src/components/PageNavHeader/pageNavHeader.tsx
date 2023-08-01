import { useNavigate } from "react-router-dom";
import PageNavHeaderWrapper from "./PageNavHeaderWrapper";
import icons from "../../constants/icons";

type pageNavHeaderProps = {
  heading: string;
  backgroundColor: string;
};

function PageNavHeader({ heading, backgroundColor }: pageNavHeaderProps) {
  const navigate = useNavigate();
  return (
    <PageNavHeaderWrapper backgroundColor={backgroundColor}>
      <div data-testid="icon" onClick={() => navigate(-1)}>
        {icons.blueLeftArrowIcon()}
      </div>

      <h1 className="heading" data-testid="heading">
        {heading}
      </h1>
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
