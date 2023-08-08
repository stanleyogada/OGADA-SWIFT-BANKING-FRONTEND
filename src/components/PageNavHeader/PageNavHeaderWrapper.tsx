import styled from "styled-components";
import { COLORS } from "../../constants";

type TProps = {
  backgroundColor?: string;
};

const PageNavHeaderWrapper = styled.div<TProps>`
  display: flex;
  align-items: center;
  gap: 18px;

  color: ${COLORS.black};
  padding: 25px 0px 20px 29px;
  ${({ backgroundColor }) => `background-color: ${backgroundColor}`};

  button {
    padding: 0 5px;
  }

  .heading {
    font-size: 15px;
    font-weight: 500;
  }
`;
export default PageNavHeaderWrapper;
