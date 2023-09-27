import { useMemo, useState } from "react";

import Stack from "@DS/Stack";

import type { TModal } from "../types";

const useModalProvider = () => {
  const [stack, setStack] = useState<Stack<TModal>>(new Stack<TModal>());

  const handleAdd = (modal: Omit<TModal, "id">) => {
    const newStack = Stack.clone(stack.data());
    newStack.push({ ...modal, id: Date.now() });

    setStack(newStack);
  };

  const handleRemove = () => {
    const lastModal = stack.peek();

    if (!lastModal) return;
    if (lastModal.isPersistent) return;
    if (lastModal.onClose) lastModal.onClose();

    const newStack = Stack.clone(stack.data());
    newStack.pop();

    setStack(newStack);
  };

  const data = useMemo(() => stack.data(), [stack]);

  return {
    data,
    handleAdd,
    handleRemove,
  };
};

export default useModalProvider;
