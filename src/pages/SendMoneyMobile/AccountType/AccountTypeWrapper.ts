import { COLORS } from "@constants/colors";
import styled from "styled-components";

const AccountTypeWrapper = styled.div`
  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  gap: 3px;

  .radio {
    padding: 10px;
    font-weight: bold;
    background-color: ${COLORS.white};

    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(0.99);
    }

    &:active {
      transform: scale(0.96);
    }

    &.active {
      background-color: ${COLORS.blue};
      color: ${COLORS.white};
    }
  }
`;

export default AccountTypeWrapper;
