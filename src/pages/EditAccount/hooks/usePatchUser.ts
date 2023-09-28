import { patchUser } from "@services/users";
import { useMutation } from "react-query";
import { useState } from "react";

const usePatchUser = () => {
  const updateUserMutation = useMutation(patchUser, {});

  return { updateUserMutation };
};

export default usePatchUser;
