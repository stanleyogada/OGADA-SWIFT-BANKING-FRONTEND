import styled from "styled-components";

import { COLORS } from "@constants/colors";

type TProps = {
  index: number;
};

const ModalWrapper = styled.div<TProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ index }) => 1000 + index + 1};

  .modal {
    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__content {
      position: relative;
      background: ${COLORS.white};
      top: 25%;
      width: 90%;
      margin: auto;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    }

    &__count-text {
      display: none;
    }

    &__close-button {
      position: absolute;
      top: -10px;
      right: -10px;
      background: ${COLORS.white};
      border: 0;
      cursor: pointer;
      font-size: 1.2rem;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.25);
    }
  }
`;

export default ModalWrapper;
