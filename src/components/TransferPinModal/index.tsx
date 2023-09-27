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
    <div>
      <div data-testid="pin-screen">{transferPin}</div>

      <div>
        {NUMBER_LIST.map((number) => (
          <button key={number} type="button" onClick={() => handleNumberClick(number.toString())}>
            {number}
          </button>
        ))}

        <div>
          <button type="button" onClick={handleCloseModal}>
            Close
          </button>

          <button type="button" onClick={handleClear}>
            Clear
          </button>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPinModal;

export { NUMBER_LIST };
