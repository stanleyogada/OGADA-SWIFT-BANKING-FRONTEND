import Reward from "@components/Reward/Reward";
import RewardsWrapper from "./RewardStyle";
import Navigation from "@components/Navigation";

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
    </RewardsWrapper>
  );
};

export default Rewards;
