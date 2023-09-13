import { useEffect, useState } from "react";
import { TModal } from "../types";
import Stack from "@DS/Stack";

const useModalProvider = () => {
  const stack = new Stack<TModal>();
  const [data, setData] = useState<TModal[]>(stack.data());

  useEffect(() => {
    setData(stack.data());
  }, [stack.size()]);

  const handleAdd = (modal: TModal) => {
    stack.push(modal);
  };

  const handleRemove = () => {
    stack.pop();
  };

  return {
    data,
    handleAdd,
    handleRemove,
  };
};

export default useModalProvider;
