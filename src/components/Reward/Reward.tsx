import Button from "./../Button/index";
import icons from "./../../constants/icons/index";
import RewardWrapper from "./RewardStyle";

export default function Reward() {
  return (
    <RewardWrapper>
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
            {icons.missRewardIcon()}

            {icons.collectedRewardIcon()}
            {icons.collectedRewardIcon()}
            {icons.todayRewardIcon()}
            {icons.collectedRewardIcon()}
            {icons.collectedRewardIcon()}
            {icons.collectedRewardIcon()}
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
        <div className="buy-airtime">
          <div>{icons.circle()}</div>
          <div>
            <h3>Buy Airtime</h3>
            <p>Buy airtime and get 3% cashback</p>
          </div>
          <div className="buy-airtime-btn">
            <Button>
              <span>Go</span>
            </Button>
          </div>
        </div>
        <hr className="line" />
        <div className="buy-data">
          <div>{icons.circle()}</div>
          <div>
            <h3>Buy Data</h3>
            <p>Buy Data and get 3% cashback</p>
          </div>

          <div className="buy-data-btn">
            <Button>
              <span>Go</span>
            </Button>
          </div>
        </div>
      </div>
    </RewardWrapper>
  );
}
