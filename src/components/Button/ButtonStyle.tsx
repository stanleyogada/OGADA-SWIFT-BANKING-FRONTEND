import styled from "styled-components";
import { COLORS } from "../../constants";

export const SButton = styled.button`
  background-color: Transparent;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  border: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  & span {
    margin-top: 5px;
    color: ${COLORS.white};
  }
`;

export const LinkWrapper = styled.div`
  & a {
    text-decoration: none;
  }
`;
