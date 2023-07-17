import styled from "styled-components";

import { COLORS } from "../../constants";

const InputWrapper = styled.div`
  .input {
    &__group {
      margin: 5px;
      padding-bottom: 15px;
      position: relative;

      .input {
        &__label {
          font-size: 11px;
          position: relative;
        }

        &__required {
          font-size: 18px;
          color: ${COLORS.pink};
          position: absolute;
          top: 0;
          right: 0;
          transform: translateX(150%);
        }

        &__control {
          &-wrapper {
            display: flex;
            align-items: center;
          }

          &-left,
          &-right {
            flex: 0 0 auto;
          }

          flex: 1;

          margin-top: 5px;
          border: none;
          border-radius: 9px;
          background: ${COLORS.gray};
          padding: 11px;
          font-size: 15px;
        }

        &__error {
          color: ${COLORS.pink};
          font-size: 13px;
          position: absolute;
          bottom: 0px;
          left: 0;
        }
      }
    }
  }
`;

export default InputWrapper;
