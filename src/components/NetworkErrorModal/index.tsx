import styled from "styled-components";

import promptErrorFixVideo from "@assets/prompt-error-fix.mp4";

const NetworkErrorModal = () => {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <NetworkErrorModalWrapper>
      <p className="modal__text">Please confirm that you network connection is not disconnected. ᯤ 📶 🌐</p>

      {isMobileDevice ? (
        <p className="modal__text">
          <mark>
            If you network connection is fine, please visit the website on a desktop computer to fix the issue.
          </mark>
        </p>
      ) : (
        <>
          <p className="modal__text">
            <mark>
              If you network connection is fine, please follow the instructions in the video below to fix the issue.
            </mark>
          </p>

          <video controls autoPlay loop muted className="modal__video">
            <source src={promptErrorFixVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </NetworkErrorModalWrapper>
  );
};

const NetworkErrorModalWrapper = styled.div`
  margin-top: 1rem;

  .modal__text {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .modal__video {
    margin-top: 1rem;
    width: 100%;
    height: 300px;
    border-radius: 0.5rem;
    overflow: hidden;
  }
`;

export default NetworkErrorModal;
