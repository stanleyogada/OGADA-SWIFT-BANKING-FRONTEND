import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SendMoneyInHouseWrapper = styled.div<{ isRecipientFound: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.lightGray2};
`;

export default SendMoneyInHouseWrapper;
