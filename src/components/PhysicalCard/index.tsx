import React from "react";
import styled from "styled-components";
import vector from "./../../constants/images/vector";
import icons from "./../../constants/icons/index";
import Button from "./../Button/index";
import { COLORS } from "./../../constants/colors/index";

function PhysicalCard() {
  return (
    <PhysicalCardWrapper>
      <div className="virtual-card-img">{vector.physical()}</div>
      <div className="instant-access-wrapper">
        <Button>
          <div className="instant-icon">{icons.lightBlueIconCard()}</div>
        </Button>
        <div className="instant-info">
          <h3 className="instant-text">Free Application and Usage</h3>
          <h6>
            <strong className="activate-text">Free </strong>
            application, <strong className="activate-text">Zero </strong>cost for ATM withdrawal and Maintenance
          </h6>
        </div>
      </div>
      <div className="safety-wrapper">
        <Button>
          <div className="safety-icon">{icons.dollarIcon()}</div>
        </Button>
        <div className="safety-info">
          <h3 className="safety-text">Earn</h3>
          <h5 className="activate">
            Flexible Spending with<span className="activate-text">15%annual interest,</span>
          </h5>
        </div>
      </div>
      <div className="marchant-wrapper">
        <Button>
          <div className="">{icons.securityIcon()}</div>
        </Button>
        <div className="marchant-info">
          <h3 className="online">Security</h3>
          <h3 className="marchant-text">
            <span className="num"> CBN </span> licensed. <span className="num">NDIC </span> insuranced
          </h3>
        </div>
      </div>
      <div className="btn-get-now">
        <Button>
          <h4 className="get">Get it Now</h4>
        </Button>
      </div>
    </PhysicalCardWrapper>
  );
}

export default PhysicalCard;

const PhysicalCardWrapper = styled.div`
  .virtual-card-img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .instant-access-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    margin: 0.3rem 0;
    gap: 10px;
    .instant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightBlue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .instant-info {
      font-weight: bold;
      .activate-text {
        color: ${COLORS.blue};
      }
      .instant-text {
        margin-bottom: 4px;
        font-size: 15px;
        font-weight: 700;
      }
      .activate {
        font-size: 13px;
      }
    }
  }
  .safety-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    gap: 10px;
    .safety-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightBlue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .safety-info {
      font-weight: 600;
      .activate-text {
        color: ${COLORS.blue};
      }
      .safety-text {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
  .marchant-wrapper {
    margin: 0.9rem 0;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    gap: 10px;
    .marchant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightBlue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .marchant-info {
      font-weight: 600;
      .activate-text {
        color: ${COLORS.blue};
      }
      .marchant-text {
        font-size: 11px;
        font-weight: 800;
      }
      .num {
        font-weight: 700;
        color: ${COLORS.blue};
      }
    }
    .online {
      font-size: 15px;
      font-weight: 800;
    }
  }
  .btn-get-now {
    background-color: ${COLORS.blue};
    display: flex;
    justify-content: center;
    margin: 0.7rem auto;
    width: 90%;

    border-radius: 5px;
    padding: 5px;
    .get {
      padding: 0.4rem;
    }
  }
`;
