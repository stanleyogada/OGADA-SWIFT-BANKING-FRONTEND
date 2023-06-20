import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import icons from "./../../constants/icons/index";
import vector from "../../constants/images/vector";
import Button from "./../Button/index";

const VirtualCard = () => {
  return (
    <>
      <VirtualWrapper>
        <div className="virtual-card-img">{vector.virtual()}</div>
        <div className="instant-access-wrapper">
          <Button>
            <div className="instant-icon">{icons.instantAccess()}</div>
          </Button>
          <div className="instant-info">
            <h3 className="instant-text">Instant Access</h3>
            <h5>
              Apply and activate<span className="activate-text"> lnstantly</span>{" "}
            </h5>
          </div>
        </div>
        <div className="safety-wrapper">
          <Button>
            <div className="safety-icon">{icons.bluecardIcon()}</div>
          </Button>
          <div className="safety-info">
            <h3 className="safety-text">Safety</h3>
            <h5 className="activate">
              No physical handing,<span className="activate-text"> No risk of loss</span>{" "}
            </h5>
          </div>
        </div>
        <div className="marchant-wrapper">
          <Button>
            <div className="">{icons.worldIcon()}</div>
          </Button>
          <div className="marchant-info">
            <h3 className="online">Online Merchant Acceptance</h3>
            <h3 className="marchant-text">
              Accepted by <span className="num">40,000</span>+online marchant including
              <br />
              <span>JUMIA,KONGA,NETFLIX</span>
            </h3>
          </div>
        </div>
        <div className="btn-get-now">
          <Button>
            <span>Get it now</span>
          </Button>
        </div>
      </VirtualWrapper>
    </>
  );
};

export default VirtualCard;

const VirtualWrapper = styled.div`
  .virtual-card-img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.3rem 0;
  }
  .instant-access-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    margin: 0.8rem 0;
    gap: 10px;
    .instant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightblue};
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
      background-color: ${COLORS.lightblue};
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
    margin: 1rem 0;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    gap: 10px;
    .marchant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightblue};
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
        font-size: 13px;
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
    margin: 0 auto;
    width: 90%;
    height: 2.7rem;
    border-radius: 5px;
    padding: 5px;
  }
`;
