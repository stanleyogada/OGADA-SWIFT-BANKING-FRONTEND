import { COLORS } from "@constants/colors";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;

  .input {
    &__group {
      margin-bottom: 8px;
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

          background: none;
          padding: 11px;
          font-size: 15px;
        }
        &__control:disabled {
          opacity: 0.2;
        }

        &__error {
          color: ${COLORS.pink};
          font-size: 12px;
          position: absolute;
          bottom: 0px;
          left: 0;
        }

        &__info {
          color: ${COLORS.darkGray};
          font-size: 14px;
          font-weight: 500;
          margin: 5px 0;
        }
      }
    }
  }
`;

export default InputWrapper;
