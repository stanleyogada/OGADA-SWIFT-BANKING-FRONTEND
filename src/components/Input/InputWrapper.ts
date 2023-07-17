import styled from "styled-components";

import { COLORS } from "../../constants";

const InputWrapper = styled.div`
  border: solid green;

  .input {
    &__group {
      margin: 5px;
      border: solid gold;
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
          }

          &-left,
          &-right {
            /* border: 2px solid tomato; */

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

  /* width: 100%; */

  /* .input {
    &__group {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 18px;
      margin-top: 13px;
    }

    &__label {
      font-size: 11px;
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
    }
  } */
`;

export default InputWrapper;
