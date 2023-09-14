import { useContext, useEffect } from "react";
import ModalContext from "../ModalContext";

const useModalApp = () => {
  const { data, handleRemove } = useContext(ModalContext);

  useEffect(() => {
    const appContainer = document.querySelector("[data-app-container]") as HTMLDivElement | null;
    if (!appContainer) return;

    if (data.length > 0) {
      appContainer.style.overflow = "hidden";
      appContainer.style.filter = "blur(2px)";

      return;
    }

    appContainer.style.overflow = "auto";
    appContainer.style.filter = "none";
  }, [data]);

  return {
    data,
    handleRemove,
  };
};

export default useModalApp;
