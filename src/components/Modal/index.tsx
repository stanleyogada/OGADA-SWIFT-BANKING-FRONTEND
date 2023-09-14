import { COLORS } from "@constants/colors";
import useModalApp from "@contexts/Modal/hooks/useModalApp";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

import ModalWrapper from "./ModalWrapper";

const Modal = () => {
  const { data } = useModalApp();
  const { handleAdd, handleRemove } = useModalConsumer();

  const handleAdModal = () => {
    handleAdd({
      heading: <p>Header</p>,
      body: <p>Body</p>,
      footer: <p>Footer</p>,
    });
  };

  return (
    <>
      {/* {process.env.NODE_ENV === "test" && <button onClick={handleAdModal}>Show Modal</button>} */}
      <button onClick={handleAdModal}>Show Modal</button>

      {data.map((modal, idx) => (
        <ModalWrapper key={modal.id} index={idx} data-testid="modal">
          <div
            data-testid="modal-overlay"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>

          <div
            data-testid="modal-content"
            style={{
              position: "relative",
              background: COLORS.white,
              top: "25%",
              width: "90%",
              margin: "auto",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              onClick={handleRemove}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: COLORS.white,
                border: 0,
                cursor: "pointer",
                fontSize: "1.2rem",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.25)",
              }}
            >
              x
            </button>
            <p
              style={{
                display: "none",
              }}
            >
              Count: {idx + 1}
            </p>
            {modal.heading}
            {modal.body}
            {modal.footer}
            <button onClick={handleAdModal}>Show Modal</button>
          </div>
        </ModalWrapper>
      ))}
    </>
  );
};

export default Modal;
