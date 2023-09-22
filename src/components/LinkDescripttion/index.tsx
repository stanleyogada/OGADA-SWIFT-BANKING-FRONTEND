import { navigate } from "@utils/test/mocks/navigate";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type TProps = {
  text: string;
  to?: string;
  removeModal: () => void;
};
const LinkDescription = ({ text, to, removeModal }: TProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // TODO:  removeModal(); uncomment this after fixing the modal
    navigate(to as string);
  };

  return (
    <LinkDescriptionWrapper>
      <div className="description-container">
        <p data-testid="content">{text}</p>

        <div className="navigationBtn">
          <button className="cancelBtn" data-testid="cancel">
            cancel
          </button>
          <button
            className="proceedBtn"
            data-testid="proceedBtn"
            onClick={() => handleNavigate()}
            disabled={to ? false : true}
          >
            proceed
          </button>
        </div>
      </div>
    </LinkDescriptionWrapper>
  );
};

export default LinkDescription;

const LinkDescriptionWrapper = styled.div`
  .description-container {
    width: 100%;

    .navigationBtn {
      width: 100%;
      display: flex;
      justify-content: end;
      margin-top: 10px;

      .cancelBtn,
      .proceedBtn {
        padding: 10px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`;
