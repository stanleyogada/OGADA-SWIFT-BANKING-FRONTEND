import Navigation from "../../components/Navigation";
import icons from "../../constants/icons";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar/Avatar";
import useAuth from "../../hooks/useAuth";

import { HomeInfoWrapper, HeroWrapper, PaymentWrapper, NotifyWrapper } from "./HomeInfoWrapper";
import vector from "@constants/images/vector";

const Home = () => {
  const { handleSignOut } = useAuth();

  return (
    <>
      <HomeInfoWrapper>
        {/* Header Info */}
        <div className="profile-head">
          <div className="profile-info">
            <Avatar />
            <h3>Hello, RichCode Dev Team</h3>
          </div>
          <div className="profile-icons">
            <div onClick={() => handleSignOut()} data-testid="sign-out-button" className="cursor-pointer">
              {vector.logoutIcon()}
            </div>

            <Link to="/" className="notify">
              <span>{icons.bellIcon()}</span>
            </Link>
          </div>
        </div>
      </HomeInfoWrapper>
      {/* Card Hero */}
      <HeroWrapper>
        <div className="top-card">
          <div className="top-card-1">
            <div className="card-1">
              <h5>Total Balance</h5>
              <Button icon={icons.eyeOpenIcon()} />
            </div>
            <h5>Transaction History</h5>
          </div>

          <div className="top-card-2">0,00</div>
        </div>
        {/* Below Card */}
        <div className="bottom-card">
          <Link to="/" className="bottom-card-link">
            <Button icon={icons.addMoneyIcon()}>Add Money</Button>
          </Link>
          <Link to="/" className="bottom-card-link">
            <Button icon={icons.transferIcon()}>Transfer</Button>
          </Link>
        </div>
      </HeroWrapper>
      {/* Payment Section */}
      <PaymentWrapper>
        <h1>Payment</h1>
        <div className="icons">
          <Button icon={icons.phoneIcon()}>Airtime</Button>
          <Button icon={icons.phoneIcon()}>Data</Button>
          <Button icon={icons.worldIcon()}>Internet</Button>
        </div>
      </PaymentWrapper>
      {/* Home Notification */}
      <NotifyWrapper>
        <div className="notify-1">
          <p>
            Upgrade to KYC with higher <br /> transaction limit.
          </p>
        </div>
        <div className="notify-2">
          <Button icon={icons.loudspeakerIcon()} />
          <div>
            <Link to="/refer">Refer & Earn</Link>
            <p>Earn #1000 Cashback per referral</p>
          </div>
        </div>
        <div className="notify-3">
          <Button icon={icons.loudspeakerIcon()} />
          <div>
            <Link to="/refer">Refer & Earn</Link>
            <p>100% Success rate and Zero charges</p>
          </div>
        </div>
      </NotifyWrapper>
      <Navigation />
    </>
  );
};

export default Home;
