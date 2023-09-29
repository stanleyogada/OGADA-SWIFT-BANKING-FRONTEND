import Modal from "@components/Modal";
import Navigation from "@components/Navigation";

import usePageWrapper from "./hooks/usePageWrapper";

const PageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  usePageWrapper();

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
            height: "calc(100vh - 63.55px)",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          {children}
        </div>

        <Navigation />
      </div>
    </>
  );
};

export default PageWrapper;
