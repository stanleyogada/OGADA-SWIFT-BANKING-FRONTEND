import styled from "styled-components";

import { COLORS } from "@constants/colors";

const AmountRemarkFormWrapper = styled.form<{
  isRecipientFound: boolean;
}>`
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
`;

export default AmountRemarkFormWrapper;
