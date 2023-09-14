import styled from "styled-components";

const NetworkErrorModalHeader = () => {
  return (
    <NetworkErrorModalHeaderWrapper>
      <h2 className="modal__title">Network Error ⚠️</h2>
    </NetworkErrorModalHeaderWrapper>
  );
};

const NetworkErrorModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .modal__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;

export default NetworkErrorModalHeader;
