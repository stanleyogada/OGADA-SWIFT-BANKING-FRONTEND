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
    <PageNavHeaderWrapper style={{ backgroundColor: `${backgroundColor}` }}>
      <div title="left-caret">
        <span data-testid="icon" onClick={() => navigate(-1)}>
          {icons.blackLeftArrowIcon()}
        </span>
        <h3>{heading}</h3>
      </div>
    </PageNavHeaderWrapper>
  );
}

export default PageNavHeader;
