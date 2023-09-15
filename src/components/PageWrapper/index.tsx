import Modal from "@components/Modal";
import usePageWrapper from "./hooks/usePageWrapper";

const PageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  usePageWrapper();

  return (
    <>
      <Modal />

      <div data-app-container>{children}</div>
    </>
  );
};

export default PageWrapper;
