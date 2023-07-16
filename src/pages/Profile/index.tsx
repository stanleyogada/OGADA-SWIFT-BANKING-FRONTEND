import styled from "styled-components";
import Avatar from "../../components/Avatar/Avatar";
import { COLORS } from "../../constants";
import icons from "../../constants/icons";
import Navigation from "../../components/Navigation";
import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";

const Profile = () => {
  return (
    <>
      <ProfileWrapper>
        <div className="top-profile-wrapper">
          <div className="profile-title">
            <div className="profile-image">
              <Avatar />
            </div>

            <div className="profile-name">Hello, Tega</div>
          </div>
          <div className="settings-icon"> {icons.settingIcon()} </div>
        </div>

        <div className="profile-buttons">
          <div className="profile-btn">
            <div className="btn-icon">{icons.dollarIcon()}</div>
            <div className="btn-content">
              <p className="heading">Total Assets</p>
              <p className="sub-heading">View your total assets and earnings</p>
            </div>
          </div>

          <div className="profile-btn">
            <div className="btn-icon">{icons.transactionIcon()}</div>
            <div className="btn-content">
              <p className="heading">Transaction History</p>
              <p className="sub-heading">View details of transactions</p>
            </div>
          </div>

          <Link to={CLIENT_ROUTES.liveChat}>
            <div className="profile-btn">
              <div className="btn-icon">{icons.userIcon()}</div>
              <div className="btn-content">
                <p className="heading">Customer Service</p>
                <p className="sub-heading">seek support from us</p>
              </div>
            </div>
          </Link>

          <div className="profile-btn">
            <div className="btn-icon">{icons.starIcon()}</div>
            <div className="btn-content">
              <p className="heading">Rate Us</p>
              <p className="sub-heading">Rate our App</p>
            </div>
          </div>
        </div>

        <Navigation />
      </ProfileWrapper>
    </>
  );
};
export default Profile;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${COLORS.black};

  a{
    text-decoration: none;
  }

  .top-profile-wrapper {
    width: 100%;
    height: 238px;
    display: flex;
    justify-content: space-between;
    background: ${COLORS.blue};

    .profile-title {
      display: flex;
      padding: 47px 0px 137px 25px;

      .profile-name {
        font-style: normal;
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        color: ${COLORS.black};
        margin-left: 10px;
      }
    }

    .settings-icon {
      padding: 55.18px 25.17px 169.8px 0px;
    }
  }

  .profile-buttons {
    width: 100%;

    .profile-btn {
      width: 90%;
      height: 45px;
      display: flex;
      background-color: ${COLORS.white};
      color: ${COLORS.black};
      padding: 5px;
      border-radius: 8px;
      margin: 23px 21px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);

      .btn-icon {
        margin-left: 14px;
      }

      .btn-content {
        height: 100%;
        margin: 0px 0px 0px 11.5px;
      }
      .btn-content .heading {
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
      }

      .btn-content .sub-heading {
        font-style: normal;
        font-weight: 700;
        font-size: 9px;
        line-height: 11px;
      }
    }
  }
`;
