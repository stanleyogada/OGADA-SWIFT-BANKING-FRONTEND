import styled from "styled-components";

import { COLORS } from "./../../constants/colors/index";

const VerifyEmailWrapper = styled.div`
  .page-title {
    padding: 27px 46px 81px;
    font-size: 15px;
    font-weight: 400;
  }

  .page-sub-title-wrapper {
    width: 100%;
    margin-bottom: 24px;

    .page-sub-title {
      color: #171717;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }

    .page-sub-title-desc {
      color: ${COLORS.black};
      font-size: 11px;
      font-weight: 400;
      text-align: center;
    }
  }

  form {
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .resend-button {
      color: ${COLORS.blue};
      text-decoration: underline;
      font-size: 13px;
      font-weight: 400;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    .verify-button {
      width: 100%;
      height: 50px;
      flex-shrink: 0;
      background-color: ${COLORS.blue};
      border: none;
      border-radius: 12px;
      margin-top: 29px;
      color: ${COLORS.white};
      font-size: 15px;
      font-weight: 700;
    }
  }
`;

export default VerifyEmailWrapper;
