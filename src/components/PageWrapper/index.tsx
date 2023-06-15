import usePageWrapper from "./hooks/usePageWrapper";

const PageWrapper = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  usePageWrapper();

  return <>{children}</>;
};

export default PageWrapper;
