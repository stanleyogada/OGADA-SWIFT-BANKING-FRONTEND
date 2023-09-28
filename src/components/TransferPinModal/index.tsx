import { COLORS } from "@constants/colors";
import styled from "styled-components";
import useTransferPinModal from "./hooks/useTransferPinModal";

type TProps = {
  onComplete: (pin: string) => void;
};

// Create an array from 0 to 9
const NUMBER_LIST = Array.from(Array(10).keys());

const TransferPinModal = ({ onComplete }: TProps) => {
  const { transferPin, handleNumberClick, handleCloseModal, handleClear, handleDelete } =
    useTransferPinModal(onComplete);

  return (
    <TransferPinWrapper>
      <div className="transferPin-container">
        <div className="pin-screen" data-testid="pin-screen">
          {transferPin}
        </div>

        <div className="transferBtn-container">
          {NUMBER_LIST.map((number) => (
            <button key={number} type="button" onClick={() => handleNumberClick(number.toString())}>
              {number}
            </button>
          ))}

          <button type="button" onClick={handleClear}>
            Clear
          </button>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </TransferPinWrapper>
  );
};

export default TransferPinModal;

export { NUMBER_LIST };

const TransferPinWrapper = styled.div`
  .transferPin-container {
    .pin-screen {
      width: 100%;
      height: 50px;
      font-weight: bold;
      display: grid;
      place-items: center;
      font-size: 40px;
      margin-bottom: 10px;
      letter-spacing: 5px;
    }

    .transferBtn-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 50px;
      gap: 20px;
      width: 80%;
      margin: 0 auto;

      button {
        border-radius: 12px;
        border: none;
        font-weight: bold;
      }
    }
  }
`;
