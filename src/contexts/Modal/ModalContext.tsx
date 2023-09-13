import { createContext } from "react";

import type { TModal } from "./types";

type TModalContextProps = {
  data: TModal[];
  handleAdd: (modal: TModal) => void;
  handleRemove: () => void;
};

const ModalContext = createContext<TModalContextProps>({
  data: [],
  handleAdd: () => {},
  handleRemove: () => {},
});

export default ModalContext;
