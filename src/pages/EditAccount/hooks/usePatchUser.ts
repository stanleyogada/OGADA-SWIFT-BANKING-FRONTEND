import { patchUser } from "@services/users";
import { useMutation } from "react-query";
import { useState } from "react";

const usePatchUser = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const updateUserMutation = useMutation(patchUser, {
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  return { isSuccess, updateUserMutation };
};

export default usePatchUser;
