import styled from "styled-components";
import { COLORS } from "../../constants";
import icons from "../../constants/icons";
import { FiChevronLeft } from "react-icons/fi";

const AddMoney = () => {
  return (
    <>
      <ProfileWrapper>
        <div className="addmoney-header">
          <p className="less-arrow">
            <FiChevronLeft />
          </p>
          <p>Add Money</p>
        </div>

        <div className="profile-buttons">
          <div className="profile-btn">
            <div className="btn-icon">{icons.dollarIcon()}</div>
            <div className="btn-content">
              <p className="heading">Total Assets</p>
              <p className="sub-heading">View your total assets and earnings</p>
            </div>
          </div>
          <p className="addmoney-border"></p>
          <div className="account-num">
            <p>Opay Account Number</p>
            <h2>000 000 0000</h2>
          </div>
        </div>

        <div className="profile-buttons-two">
          <div className="profile-btn">
            <div className="btn-icon">{icons.dollarIcon()}</div>
            <div className="btn-content">
              <p className="heading">Total Assets</p>
              <p className="sub-heading">View your total assets and earnings</p>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default AddMoney;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${COLORS.black};

  .addmoney-header {
    width: 100%;
    height: 138px;
    display: flex;
    font-weight: 800;
    column-gap: 4rem;
    background: ${COLORS.lightblue};
    align-items: center;
  }
  .addmoney-header p {
    margin-top: 4rem;
    margin-left: 14px;
  }
  .less-arrow {
    color: ${COLORS.black};
    font-size: 1.5rem;
  }

  .account-num {
    margin-left: 14px;
    font-weight: bold;
    margin-bottom: 3.6rem;
    padding-top: 1rem;
    line-height: 1.5;
    p {
      font-size: 0.6rem;
    }
    h2 {
      font-size: 1.8rem;
    }
  }

  .addmoney-border {
    border: solid 1px ${COLORS.gray};
    // margin-bottom: 5rem;
    margin-top: 3rem;
  }

  .profile-buttons {
    // width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    width: 90%;
    padding: 5px;
    border-radius: 8px;
    margin: 23px 21px;
    margin-left: 5rem;

    .profile-btn {
      width: 90%;
      height: 50px;
      display: flex;

      .btn-icon {
        margin-left: 14px;
        font-size: 2rem;
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

  .profile-buttons-two {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
    width: 90%;
    padding: 5px;
    border-radius: 8px;
    margin: 23px 21px;
    margin-left: 5rem;

    .profile-btn {
      width: 90%;
      height: 80px;
      display: flex;

      .btn-icon {
        margin-left: 14px;
        font-size: 2rem;
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

  @media (max-width: 900px) {
     .addmoney-header{
      display: flex;
      // justify-content: center;
      width: 100%;
     }
     .profile-buttons{
      margin-left: 2rem;
     }
     .profile-buttons-two{
      margin-left: 2rem;
     }
  }
`;
