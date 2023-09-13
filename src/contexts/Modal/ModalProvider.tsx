import ModalContext from "./ModalContext";
import useModalProvider from "./hooks/useModalProvider";

type TProps = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: TProps) => {
  const { data, handleAdd, handleRemove } = useModalProvider();

  return (
    <ModalContext.Provider
      value={{
        data,
        handleAdd,
        handleRemove,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
