import dollar from "../../assets/vector.svg";
import access from "../../assets/Opay-machine.svg";
import stats from "../../assets/Opay-stats.svg";
import transfer from "../../assets/transfer.svg";
import board from "../../assets/Opay-board.svg";

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
};

export default vector;
