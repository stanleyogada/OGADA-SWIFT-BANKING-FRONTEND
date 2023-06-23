import dollar from "../../assets/vector.svg";
import access from "../../assets/Opay-machine.svg";
import stats from "../../assets/Opay-stats.svg";
import transfer from "../../assets/transfer.svg";
import board from "../../assets/Opay-board.svg";
import virtual from "../../assets/virtual-card.svg";
import physical from "../../assets/physical-card.svg";

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
};

export default vector;
