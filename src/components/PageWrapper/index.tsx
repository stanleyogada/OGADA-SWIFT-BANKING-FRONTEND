import Modal from "@components/Modal";
import Navigation from "@components/Navigation";

import usePageWrapper from "./hooks/usePageWrapper";

const PageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const { isAuthPage } = usePageWrapper();

  return (
    <>
      <Modal />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          data-app-container
          style={{
            height: "calc(100vh - 85px)",
            overflowY: "auto",
            paddingBottom: "7rem",
            borderBottom: "2rem solid transparent",
          }}
        >
          {children}
        </div>

        <Navigation mute={isAuthPage} />
      </div>
    </>
  );
};

export default PageWrapper;
