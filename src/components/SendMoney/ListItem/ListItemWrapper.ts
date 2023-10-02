import { COLORS } from "@constants/colors";
import styled from "styled-components";

const ListItemWrapper = styled.div<{
  onClick?: () => void;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  z-index: 5;

  transition: all 0.3s ease-in-out;

  ${({ onClick }) =>
    onClick
      ? `
      &:hover {
        transform: scale(0.99);
        cursor: pointer;
        background-color: ${COLORS.gray};
      }`
      : ""}

  .text-wrapper {
    .fullname {
      font-size: 16px;
      font-weight: 600;
    }

    .phone {
      font-size: 12px;
      margin-top: 4px;
      color: #9b9999;
    }
  }

  .user-image {
    border-radius: 50%;
    width: 50px;
    margin-right: 16px;
  }
`;

export default ListItemWrapper;
