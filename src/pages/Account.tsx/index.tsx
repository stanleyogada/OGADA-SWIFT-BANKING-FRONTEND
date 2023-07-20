import styled from "styled-components";
import { useRef, useState } from "react";

import icons from "../../constants/icons";
import Avatar from "../../components/Avatar/Avatar";
import { COLORS } from "../../constants";

const Account = () => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggleIcon = () => {
    if (ref.current) {
      if (!isClicked) {
        setIsClicked(!isClicked);
        ref.current.style.height = "200px";
      } else {
        setIsClicked(!isClicked);
        ref.current.style.height = "128px";
      }
    }
  };

  return (
    <>
      <AccountWrapper>
        <div className="account-section" role="account-section">
          <div className="header">
            <div className="navigation-section">
              <div className="back-icon"> {icons.blueLeftArrowIcon()}</div>
              <div className="section-title">Account Details</div>
            </div>

            <div className="edit-btn">Edit</div>
          </div>

          <div className="profile-section">
            <div className="profile-title">Profile Homepage</div>

            <div className="avatar">
              <Avatar />
              <div className="right-icon">{icons.blueRightArrowIcon()}</div>
            </div>
          </div>

          <div className="user-info-section" ref={ref} role="info-section">
            <div className="info-wrapper">
              <div className="label">Name</div>
              <div className="info">Egajivwie Samuel akpevwe</div>
            </div>

            <div className="info-wrapper">
              <div className="label">OPay Account Number</div>
              <div className="info">7025377623622</div>
            </div>

            <div className="info-wrapper">
              <div className="label">Email</div>
              <div className="info">
                <button className="verified">
                  Verified
                  {/* {icons.checkIcon()} // TODO: Add check icon */}
                </button>
              </div>
            </div>

            <div className="expand">
              <div className="show-wrapper">
                <div className="show-wrapper-text">{isClicked ? "Show Less" : "Show More"}</div>
                <div className="show-wrapper-icon" role="toggle" onClick={() => handleToggleIcon()}>
                  {/* {icons.blueDropdownIcon()} // TODO: Add dropdown icon */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccountWrapper>
    </>
  );
};

export default Account;

const AccountWrapper = styled.div`
  .account-section {
    width: 100%;
    height: 100vh;

    .header {
      width: 100%;

      height: auto;
      display: flex;
      justify-content: space-between;
      padding: 45px 0px 0px 28.59px;

      .navigation-section {
        display: flex;

        .back-icon {
          margin-right: 19.8px;
        }

        .section-title {
          color: ${COLORS.black};
          font-size: 15px;
          font-family: Inter;
        }
      }

      .edit-btn {
        margin-right: 17px;
        color: ${COLORS.blue};
        font-size: 15px;
        font-family: Inter;
      }
    }

    .profile-section {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .profile-title {
        margin-left: 29px;
        color: ${COLORS.black};
        font-size: 11px;
        font-family: Inter;
        font-weight: 700;
      }

      .avatar {
        width: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 16.18px;
      }
    }

    .user-info-section {
      width: 100%;
      height: 128px;
      background-color: ${COLORS.blue};
      padding: 9px 16px 9px 37px;
      position: relative;
      overflow: hidden;
      transition: height 0.3s ease-out;

      .info-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        color: ${COLORS.white};
        font-size: 11px;
        font-family: Inter;

        .info {
          .verified {
            width: 71px;
            height: 18px;
            flex-shrink: 0;
            background-color: ${COLORS.white};
            color: ${COLORS.blue};
            font-size: 9px;
            padding: 5px;
            border: none;
            border-radius: 10px;
          }
        }
      }
    }

    .expand {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 0;
      left: 2%;

      .show-wrapper {
        display: flex;

        .show-wrapper-text {
          color: ${COLORS.white};
          font-size: 11px;
          font-family: Inter;
        }

        .show-wrapper-icon {
          margin: -5px 0px 0px 5px;
          flex-shrink: 0;
        }
      }
    }
  }
`;
