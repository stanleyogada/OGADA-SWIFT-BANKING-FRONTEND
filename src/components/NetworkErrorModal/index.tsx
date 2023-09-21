import promptErrorFixVideo from "@assets/prompt-error-fix.mp4";

import NetworkErrorModalWrapper from "./NetworkErrorModalWrapper";

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

export default NetworkErrorModal;
