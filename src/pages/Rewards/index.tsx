import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";
import styled from "styled-components";
import { COLORS } from "./../../constants/colors/index";

import Reward from "./../../components/Reward/Reward";

const Rewards = () => {
  return (
    <RewardsWrapper>
      <div>
        <div className="title">
          <div className="reward">Rewards</div>
          <div className="rules">Rules</div>
        </div>
      </div>
      <Reward />

      <Navigation />
    </RewardsWrapper>
  );
};

export default Rewards;

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
