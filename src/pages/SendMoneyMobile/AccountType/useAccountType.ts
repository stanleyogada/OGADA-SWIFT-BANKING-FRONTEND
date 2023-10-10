import { TUserAccountType } from "@services/users/types";
import { useState } from "react";

const useAccountType = () => {
  const [accountType, setAccountType] = useState<TUserAccountType>("NORMAL");

  const handleAccountTypeChange = (type: TUserAccountType) => {
    setAccountType(type);
  };

  const allAccountType = ["NORMAL", "CASHBACK"] as TUserAccountType[];

  return {
    allAccountType,
    accountType,
    handleAccountTypeChange,
  };
};

export default useAccountType;
