import { QUERY_KEYS } from "@constants/services";
import { getBanks } from "@services/banks";
import { useState } from "react";
import { useQuery } from "react-query";

const useSendMoneyBank = () => {
  const [currentBankCode, setCurrentBankCode] = useState<number | null>(null);

  const banks = useQuery(QUERY_KEYS.getAllBanks, getBanks, {
    retry: false,
  });

  return {
    banks,
  };
};

export default useSendMoneyBank;
