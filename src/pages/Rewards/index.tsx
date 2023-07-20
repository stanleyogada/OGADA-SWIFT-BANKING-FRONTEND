import Navigation from "../../components/Navigation";
import Reward from "./../../components/Reward/Reward";

import RewardsWrapper from "./RewardStyle";

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
