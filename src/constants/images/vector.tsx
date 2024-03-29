import dollar from "@assets/vector.svg";
import access from "@assets/Opay-machine.svg";
import stats from "@assets/Opay-stats.svg";
import transfer from "@assets/transfer.svg";
import board from "@assets/Opay-board.svg";
import virtual from "@assets/virtual-card.svg";
import physical from "@assets/physical-card.svg";
import cashback from "@assets/cashback-icon.svg";
import transfer_icon from "@assets/transfer-icon.svg";
import data from "@assets/data-icon.svg";
import deposit from "@assets/deposit-icon.svg";
import logout from "@assets/logout-icon.png";
import checkIcon from "@assets/checkIcon.png";
import errorIcon from "@assets/ErrorIcon.png";

const vector = {
  stats() {
    return <img src={stats} />;
  },
  access() {
    return <img src={access} />;
  },
  dollar() {
    return <img src={dollar} />;
  },
  transfer() {
    return <img src={transfer} />;
  },
  board() {
    return <img src={board} />;
  },
  virtual() {
    return <img src={virtual} />;
  },
  physical() {
    return <img src={physical} />;
  },

  rewardsIcon() {
    return <img src={cashback} />;
  },
  inHousesIcon() {
    return <img src={transfer_icon} />;
  },
  mobileIcon() {
    return <img src={data} />;
  },
  banksIcon() {
    return <img src={deposit} />;
  },
  logoutIcon() {
    return (
      <img
        src={logout}
        width={25}
        height={25}
        style={{
          marginTop: "-3px",
        }}
      />
    );
  },
  checkIcon() {
    return <img src={checkIcon} width="100px" />;
  },
  errorIcon() {
    return <img src={errorIcon} width="100px" />;
  },
};

export default vector;
