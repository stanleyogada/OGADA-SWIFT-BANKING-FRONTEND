import { COLORS } from "../../constants/colors";
import Navigation from "../../components/Navigation";
import icons from "../../constants/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar/Avatar";
import useToken from "../../hooks/useToken";

const Home = () => {
  const { handleSignout } = useToken();

  return (
    <>
      <HomeInfoWrapper>
        {/* Header Info */}
        <div className="profile-head">
          <div className="profile-info">
            <Avatar />
            <h3>Hello, Tega</h3>
          </div>
          <div className="profile-icons">
            <div onClick={handleSignout}>
              <Link to="/" className="notify">
                <span className="cursor-pointer">{icons.blackUserIcon()}</span>
              </Link>
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
            <h5>Transact...n History</h5>
          </div>

          <div className="top-card-2">0,00</div>
        </div>
        {/* Below Card */}
        <div className="bottom-card">
          <Link to="/" className="bottom-card-link">
            <Button icon={icons.addmoneyIcon()}>Add Money</Button>
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

const HomeInfoWrapper = styled.section`
  .profile-head {
    display: flex;
    align-item: center;
    justify-content: space-between;
    width: 90vw;
    margin: 0 auto;
    padding-top: 0.7rem;

    .profile-info {
      display: flex;
      align-item: center;
      justify-content: space-between;
      gap: 0.85rem;

      h3 {
        justify-self: center;
        align-self: center;
        font-size: 1.2rem;
      }
    }
    .profile-icons {
      display: flex;
      align-item: center;
      justify-content: space-between;
      gap: 0.85rem;
      margin-top: 0.85rem;

      a .notify {
        color: #000;
      }
    }
  }
  @media screen and (min-width: 400px) {
    .profile-head {
      padding-top: 1rem;

      .profile-info {
        gap: 0.85rem;
      }
    }
  }
`;

const HeroWrapper = styled.section`
  background: ${COLORS.blue};
  width: 90vw;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
  color: ${COLORS.white};

  .top-card {
    display: grid;
    gap: 0.75rem;

    .top-card-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .card-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
    }
  }

  .bottom-card {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .bottom-card-link {
      text-decoration: none;
      /* color: ${COLORS.white}; */
    }
  }
  @media screen and (min-width: 400px) {
    margin-top: 1.5rem;
    gap: 2.5rem;
    padding: 1.5rem;
  }
`;

const PaymentWrapper = styled.section`
  width: 90vw;
  margin: 0 auto;
  margin-top: 0.75rem;
  h1 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }

  .icons {
    display: flex;
    align-item: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  @media screen and (min-width: 400px) {
    margin-top: 1rem;
    h1 {
      margin-bottom: 1.3rem;
    }
  }
`;

const NotifyWrapper = styled.section`
  display: grid;
  align-items: center;
  gap: 0.5rem;
  width: 90vw;
  margin: 0 auto;
  position: absolute;
  left: 1rem;
  bottom: 5rem;
  right: 0;

  .notify-1,
  .notify-2,
  .notify-3 {
    background: ${COLORS.gray};
    padding: 0.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      text-decoration: none;
      font-weight: bold;
    }

    p {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 400px) {
    gap: 0.75rem;

    .notify-1,
    .notify-2,
    .notify-3 {
      padding: 0.5rem;
      gap: 0.75rem;
    }
  }
`;
