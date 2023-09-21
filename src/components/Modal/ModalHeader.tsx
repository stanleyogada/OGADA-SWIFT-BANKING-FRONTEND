import styled from "styled-components";

type TProps = {
  text: string;
};

const ModalHeader = ({ text }: TProps) => {
  return (
    <ModalHeaderWrapper>
      <h2 className="modal__title">{text}</h2>
    </ModalHeaderWrapper>
  );
};

const ModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .modal__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;

export default ModalHeader;
