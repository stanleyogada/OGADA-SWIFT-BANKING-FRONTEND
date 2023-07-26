import styled from "styled-components";
import { COLORS } from "@constants/colors";

const RewardsWrapper = styled.div`
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 10px 20px;

    .reward {
      font-weight: 700;
      font-size: 25px;
    }

    .rules {
      font-weight: 400;
      font-size: 16px;
      color: ${COLORS.blue};
    }
  }
`;
export default RewardsWrapper;
