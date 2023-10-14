import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SendMoneyWrapper = styled.div`
  .mobile-container {
    .network-wrapper {
      display: flex;
      justify-content: start;
      align-items: start;
      flex-flow: column;
    }

    .plan-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;

      #plans {
        display: grid;
        place-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
      }
    }

    .amount-input {
      button {
        padding: 12px;
        width: 100px;
        background: ${COLORS.blue};
        color: white;
        border: none;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 20px;
      }
    }
  }
`;

export default SendMoneyWrapper;
