import styled from "styled-components";

import { COLORS } from "../../constants";

const InputWrapper = styled.div`
  .input {
    &__group {
      padding-bottom: 13px;
      position: relative;

      .input {
        &__label {
          font-size: 11px;
          position: relative;
          font-weight: 600;
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

            background: ${COLORS.gray};
            border-radius: 9px;
            margin-top: 2px;
          }

          &-left,
          &-right {
            flex: 0 0 auto;
            padding: 0 11px;
          }

          flex: 1;

          border: none;
          background: none;
          padding: 11px;
          font-size: 15px;
        }

        &__error {
          color: ${COLORS.pink};
          font-size: 12px;
          position: absolute;
          bottom: 0px;
          left: 0;
        }
      }
    }
  }
`;

export default InputWrapper;
