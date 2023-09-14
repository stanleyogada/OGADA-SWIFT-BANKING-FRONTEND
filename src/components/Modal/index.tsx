import useModalApp from "@contexts/Modal/hooks/useModalApp";

import ModalWrapper from "./ModalWrapper";
import ModalTestShowButton from "./ModalTestShowButton";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const Modal = () => {
  const { data, handleRemove } = useModalApp();

  return (
    <>
      {IS_TEST_ENV && <ModalTestShowButton />}

      {data.map((modal, idx) => (
        <ModalWrapper key={modal.id} index={idx} data-testid="modal">
          <div data-testid="modal-overlay" className="modal__overlay" onClick={handleRemove}></div>

          <div data-testid="modal-content" className="modal__content">
            <button onClick={handleRemove} className="modal__close-button">
              x
            </button>
            <p className="modal__count-text">Count: {idx + 1}</p>
            {modal.heading}
            {modal.body}
          </div>
        </ModalWrapper>
      ))}
    </>
  );
};

export default Modal;
