import styled from "styled-components";

import { COLORS } from "@constants/colors";

const ResendEmailWrapper = styled.div`
  .page-title {
    padding: 27px 46px 81px;
    font-size: 15px;
    font-weight: 400;
  }

  .page-sub-title {
    color: ${COLORS.black};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 35px;
  }

  form {
    width: 100%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .send-button {
      width: 100%;
      height: 50px;
      flex-shrink: 0;
      background-color: ${COLORS.blue};
      border: none;
      border-radius: 12px;
      color: ${COLORS.white};
      font-size: 15px;
      font-weight: 700;
    }
  }
`;

export default ResendEmailWrapper;
