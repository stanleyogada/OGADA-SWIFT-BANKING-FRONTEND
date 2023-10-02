import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SendMoneyInHouseWrapper = styled.div<{ isRecipientFound: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.lightGray2};

  .banner-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .banner {
      width: 95%;
      background-color: ${COLORS.lightBlue};
      padding: 12px;
      border-radius: 10px;
      color: ${COLORS.blue};
      margin: 20px 0px;
      border: 2px solid;
      font-weight: bold;
      opacity: 0.7;
    }
  }

  .beneficiaries {
    padding: 16px;
  }

  .recipient-title {
    margin: 16px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export default SendMoneyInHouseWrapper;
