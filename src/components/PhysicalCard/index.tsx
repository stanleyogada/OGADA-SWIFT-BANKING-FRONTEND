import React from "react";

import icons from "@constants/icons";
import vector from "@constants/images/vector";

import Button from "@components/Button";

import PhysicalCardWrapper from "./PhysicalStyle";

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
