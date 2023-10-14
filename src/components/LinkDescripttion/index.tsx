import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import { COLORS } from "@constants/colors";

type TProps = {
  text: string;
  to?: string;
};
const LinkDescription = ({ text, to }: TProps) => {
  const { handleRemove } = useModalConsumer();
  const navigate = useNavigate();

  const handleNavigate = () => {
    handleRemove();
    navigate(to as string);
  };

  return (
    <LinkDescriptionWrapper>
      <div className="description-container">
        <p data-testid="content">{text}</p>

        <div className="navigationBtn">
          <button className="cancelBtn" data-testid="cancel" onClick={handleRemove}>
            cancel
          </button>
          <button className="proceedBtn" data-testid="proceedBtn" onClick={handleNavigate} disabled={to ? false : true}>
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
      padding-top: 50px;

      .cancelBtn,
      .proceedBtn {
        padding: 15px;
        margin: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        text-transform: capitalize;
      }

      .proceedBtn {
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
      }
    }
  }
`;
