import { COLORS } from "@constants/colors";

import styled from "styled-components";

const SigninWrapper = styled.div`
  .page-title {
    padding: 27px 46px 81px;
    font-size: 15px;
    font-weight: 400;
  }

  main.content {
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
  }
`;

export default SigninWrapper;
