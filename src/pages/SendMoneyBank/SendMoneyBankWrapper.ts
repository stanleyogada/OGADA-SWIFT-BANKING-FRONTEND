import styled from "styled-components";

import { COLORS } from "@constants/colors";

const SendMoneyBankWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.lightGray2};
  overflow-y: scroll;

  .banks {
    padding-bottom: 30px;

    &__title {
      padding: 12px;
      font-weight: bold;
    }
  }

  .banner-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .banner {
      width: 90%;
      padding: 12px;
      background: ${COLORS.lightBlue};
      border-radius: 12px;
      color: ${COLORS.blue};
      font-weight: 400;
    }
  }

  .bank-container {
    width: 100%;

    .all-banks {
      max-height: 300px;
      overflow-y: auto;
    }

    .sendData {
      .user-found {
        display: flex;
        justify-content: space-between;
        padding: 0 20px 20px;

        img {
          width: 20px;
        }
      }
    }

    .current-bank {
      display: flex;
      padding: 12px;

      .bank {
        display: flex;
        margin-top: 10px;
        padding: 5px;
        width: 95%;
        margin: 0 auto;

        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          border: 0.3px solid ${COLORS.lightGray};
        }

        p {
          margin: 10px;
        }
      }

      button {
        border: none;
        padding: 12px;
        font-weight: bold;
        color: ${COLORS.pink};
      }
    }
  }
`;

export default SendMoneyBankWrapper;
