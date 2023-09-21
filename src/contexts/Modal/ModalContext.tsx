import { createContext } from "react";

import type { TModal } from "./types";

type TModalContextProps = {
  data: TModal[];
  handleAdd: (modal: Omit<TModal, "id">) => void;
  handleRemove: () => void;
};

const ModalContext = createContext<TModalContextProps>({
  data: [],
  handleAdd: () => {},
  handleRemove: () => {},
});

export default ModalContext;
