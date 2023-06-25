import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";
import styled from "styled-components";
import { COLORS } from "./../../constants/colors/index";
import icons from "./../../constants/icons/index";
import Button from "./../../components/Button/index";

const Rewards = () => {
  return (
    <RewardsWrapper>
      <div>
        <div className="title">
          <div className="reward">Rewards</div>
          <div className="rules">Rules</div>
        </div>
      </div>

      <div className="curve">
        <div className="box-one">
          <div className="cashback-voucher-wrapper">
            <div className="cash">
              <p> Cashback</p>
              <div className="amount-wrapper">
                <p className="amount"> N22.00</p>
                <p> &gt; </p>
              </div>
            </div>
            <div className="vou">
              <p> Voucher</p>
              <div className="amountTwo-wrapper">
                <p className="amountTwo">0</p>
                <p> &gt; </p>
              </div>
            </div>
          </div>
          <div className="daily">
            <h5>Daily Cashback</h5>
            <h5>
              You've earned <span>1500</span> cashback
            </h5>
          </div>

          <div className="reward-icon">
            {icons.missrewardIcon()}

            {icons.collectedrewardIcon()}
            {icons.collectedrewardIcon()}
            {icons.todayrewardIcon()}
            {icons.collectedrewardIcon()}
            {icons.collectedrewardIcon()}
            {icons.collectedrewardIcon()}
          </div>
          <div className="btn-wrapper">
            <Button>
              <span> You have signed in today</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="box-two">
        <div className="head-wrapper">
          <h4>All Bonus</h4>
          <h5>History&gt;</h5>
        </div>
        <hr className="line" />
        <div className="time-limit">
          <h3>Time limited</h3>
          <div className="underline"></div>
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
    height: 129.735px;
    background: ${COLORS.blue};
    position: relative;
  }
  .curve::after {
    content: "";
    position: absolute;
    bottom: -27.8675px;
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
    box-shadow: 2px 2px 2px 1px ${COLORS.gray}, -2px 2px 2px 1px ${COLORS.gray};

    .cashback-voucher-wrapper {
      padding-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      .cash {
        background-color: ${COLORS.gray};
        width: 160px;
        height: 60px;
        border-radius: 5px;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: 600;
        .amount-wrapper {
          display: flex;
          gap: 10px;
          justify-content: space-between;
          padding: 3px 10px;
          font-size: 12px;

          width: 90%;
          .amount {
            font-size: 15px;
            color: ${COLORS.blue};
            font-weight: 700;
          }
        }
      }
      .vou {
        background-color: ${COLORS.gray};
        width: 160px;
        height: 60px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: 600;
        flex-direction: column;
        .amountTwo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: space-between;
          padding: 3px 8px;
          font-size: 12px;

          width: 100%;
          .amountTwo {
            font-size: 16px;
            color: ${COLORS.blue};
            font-weight: 700;
          }
        }
      }
    }
    .daily {
      padding: 5px 15px;
      font-size: 14px;
      font-weight: 600;
      & span {
        color: ${COLORS.yellow};
      }
    }
    .reward-icon {
      width: 100%;
      margin-top: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.7rem;
    }
    .btn-wrapper {
      margin: 20px 20px auto auto;
      background: ${COLORS.lightblue};
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      border-radius: 23px;
      width: 90%;
    }
  }
  .box-two {
    margin-top: 10rem;

    margin-left: 20px;
    height: 230px;
    width: 350px;
    background-color: ${COLORS.white};
    border-radius: 4px;
    box-shadow: 2px 2px 2px ${COLORS.gray}, -2px 2px 2px 2px ${COLORS.gray};
    .head-wrapper {
      display: flex;
      width: 100%;
      font-weight: 600;
      padding: 10px 10px;
      justify-content: space-between;
    }
    .line {
      border-width: 0.6px;
    }
    .time-limit {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      font-size: 12px;
      flex-direction: column;
      .underline {
        height: 3px;
        width: 30px;
        border-radius: 2px;
        background: ${COLORS.blue};
      }
    }
  }
`;
