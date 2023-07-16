import styled from "styled-components";

import { COLORS } from "../../constants";

const InputWrapper = styled.div`
  width: 100%;

  .input {
    &__group {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 18px;
      margin-top: 13px;
    }

    &__label {
    }

    &__required {
      color: ${COLORS.pink};
    }

    &__control {
      flex: 1;
      border: none;
      border-radius: 9px;
      background: ${COLORS.gray};
      padding: 11px;
      font-size: 15px;
    }

    &__error {
      color: ${COLORS.pink};
      position: absolute;
      bottom: 0px;
      left: 0;
      font-size: 12px;
    }
  }
`;

export default InputWrapper;
