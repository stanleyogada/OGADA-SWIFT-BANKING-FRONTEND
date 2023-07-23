import styled from "styled-components";

import { COLORS } from "../../constants";

const VerifyEmailWrapper = styled.div`
  .page-title {
    padding: 27px 46px 81px;
    font-size: 15px;
    font-weight: 400;
  }

  /* main.content {
    .sub-title {
      padding-bottom: 27px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }

    .form {
      padding: 0 13px;

      &__input-list {
        display: flex;
        flex-direction: column;
        padding-bottom: 87px;
      }

      &__actions {
        &-top {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          padding-bottom: 32px;

          .form__checkbox {
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 5px;
          }
        }

        &-bottom {
          background: ${COLORS.blue};
          color: ${COLORS.white};
          padding: 16px;
          border-radius: 9px;
          width: 100%;

          font-size: 15px;
          font-weight: 700;
          margin-bottom: 20px;

          * {
            margin: 0;
          }
        }

        .form__link {
          color: ${COLORS.blue};
          text-decoration: none;
        }
      }
    }
  } */

  .page-sub-title-wrapper {
    width: 100%;
    margin-bottom: 24px;

    .page-sub-title {
      color: #171717;
      text-align: center;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .page-sub-title-desc {
      color: #000;
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: center;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .resend-button {
      color: #000;
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      background-color: transparent;
      border: none;
    }

    .verify-button {
      width: 90%;
      height: 50px;
      flex-shrink: 0;
      background-color: #006fff;
      border: none;
      border-radius: 12px;
      margin-top: 29px;
      color: #fff;
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  .resend-button {
    color: ${COLORS.blue};
  }
`;

export default VerifyEmailWrapper;
