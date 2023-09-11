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
};

export default vector;
