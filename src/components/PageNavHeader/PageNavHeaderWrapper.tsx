import styled from "styled-components";
import { COLORS } from "../../constants";

const PageNavHeaderWrapper = styled.div`
  color: ${COLORS.white};
  padding: 50px 0px 15px 29px;

  div {
    gap: 20px;
    display: flex;
    align-items: center;
    h3 {
      font-size: 20px;
    }
  }
`;
export default PageNavHeaderWrapper;
