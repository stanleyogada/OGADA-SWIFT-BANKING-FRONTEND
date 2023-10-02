import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SendMoneyWrapper = styled.div<{ isRecipientFound: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;

  .input-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .recipient-input {
      width: 95%;
      padding: 16px;
      border-radius: 8px;
    }
  }

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

  .user-form {
    flex-direction: column;
    align-items: center;
    display: flex;
    /* display: ${(props) => (props.isRecipientFound ? "flex" : "none")}; */
    ${(props) =>
      props.isRecipientFound
        ? ""
        : `
        position: fixed;
        top: 0;
        left: 0;
        transform: translate(-100%, -100%);
    `}

    .recipient-input {
      width: 95%;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .transfer-btn {
      width: 95%;
      background-color: ${COLORS.blue};
      border-radius: 10px;
      padding: 16px;
      border: none;
      color: ${COLORS.white};
      margin-top: 20px;
    }

    .transfer-btn:hover {
      outline: 2px solid ${COLORS.blue};
      outline-offset: 2px;
    }
  }

  .recipient-title {
    margin: 16px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export default SendMoneyWrapper;
