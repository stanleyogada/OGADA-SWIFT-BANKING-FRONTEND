import { Link } from "react-router-dom";

import ProfileWrapper from "./ProfileStyle";

import icons from "@constants/icons";
import { CLIENT_ROUTES } from "@constants/routes";

import Navigation from "@components/Navigation";
import Avatar from "@components/Avatar/Avatar";

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
