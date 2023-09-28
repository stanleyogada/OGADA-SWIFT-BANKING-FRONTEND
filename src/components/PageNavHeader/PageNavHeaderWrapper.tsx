import styled from "styled-components";
import { COLORS } from "@constants/colors";

type TProps = {
  backgroundColor?: string;
};

const PageNavHeaderWrapper = styled.div<TProps>`
  display: flex;
  align-items: center;
  gap: 18px;

  color: ${COLORS.black};
  padding: 25px 0px 20px 4px;
  ${({ backgroundColor }) => `background-color: ${backgroundColor}`};

  button {
    padding: 0 5px;
  }

  .heading {
    font-size: 15px;
    font-weight: 500;
  }
  .text {
    color: ${COLORS.blue};
    text-align: end;
    font-weight: 500;
    font-size: 17px;
    background-color: ${COLORS.white};
    border: none;
  }
`;
export default PageNavHeaderWrapper;
