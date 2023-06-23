import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";
import styled from "styled-components";
import { COLORS } from "./../../constants/colors/index";

const Rewards = () => {
  return (
    <RewardsWrapper>
      <div>
        <div className="title">
          <div className="reward">Rewards</div>
          <div className="rules">Rules</div>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="curve">
          <div className="box-one"></div>
        </div>
      </div>
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
  .curve {
    width: 100%;
    height: 157.735px;
    background: ${COLORS.blue};
    position: relative;
  }
  .curve::after {
    content: "";
    position: absolute;
    bottom: -28.8675px;
    left: 0;
    width: 74%;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 28.8675px solid ${COLORS.blue};
  }
  .box-one {
    height: 230px;
    width: 350px;
    background-color: ${COLORS.white};
    position: absolute;
    top: 25px;
    left: 20px;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 2px 2px 2px ${COLORS.gray};
  }
`;
