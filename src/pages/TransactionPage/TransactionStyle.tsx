import { COLORS } from "@constants/colors";
import styled from "styled-components";

const TransactionWrapper = styled.div`
  .transaction-container {
    width: 100%;
    height: auto;
    /* border: 1px solid red; */

    .transaction-header {
      border-bottom: 2.5px solid ${COLORS.blue};
      box-shadow: 5px 3px 4px 2px rgba(0, 0, 0, 0.2);

      .categories-section {
        display: flex;
        /* border: 1px solid green; */
        justify-content: start;
        margin-left: 29.5px;

        p {
          color: #000;
          font-family: Inter;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding: 5px 60px 10px 0px;
          /* padding: 25px 60px; */
        }
      }
    }

    .date {
      width: 100%;
      display: flex;

      p {
        color: #000;
        font-family: Inter;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        padding: 15px 0px 15px 25px;
      }
    }

    .transaction-card {
      border-bottom: 1px solid rgba(237, 237, 237, 0.66);
      margin-top: 20px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      margin-left: 20px;

      .transaction-info {
        display: flex;

        .trans-icon {
          margin-right: 10px;
        }

        .title {
          color: #000;
          font-family: Inter;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .trans-date {
          color: #707070;
          font-family: Inter;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .transaction-details {
        .amount {
          color: #000;
          font-family: Inter;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .status {
          color: ${COLORS.blue};
          font-family: Inter;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    .transaction-card:hover {
      cursor: pointer;
    }

    .btn-wrapper {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        background-color: ${COLORS.blue};
        color: white;
        width: 50%;
        border-radius: 10px;
        border: none;
        padding: 12px;
      }
    }
  }
`;

export default TransactionWrapper;
