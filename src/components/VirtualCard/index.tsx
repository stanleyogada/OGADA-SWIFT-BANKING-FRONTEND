import icons from "@constants/icons";
import vector from "@constants/images/vector";

import VirtualWrapper from "./VirtualCard.Style";

import Button from "@components/Button";

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
            <div className="safety-icon">{icons.blueCardIcon()}</div>
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
            <h4 className="get">Get it now</h4>
          </Button>
        </div>
      </VirtualWrapper>
    </>
  );
};

export default VirtualCard;
