import { LOCAL_STORAGE_KEYS } from "@constants/index";
import useCurrentUser from "@hooks/useCurrentUser";

import type { TBeneficiary } from "@components/SendMoney/Beneficiaries/types";

const useSendMoneyBeneficiaries = () => {
  const { data: currentUser } = useCurrentUser();

  const handleGetAllBeneficiaries = (type: TBeneficiary["type"]): TBeneficiary[] => {
    const beneficiaries = localStorage.getItem(LOCAL_STORAGE_KEYS.saveBeneficiary);

    if (beneficiaries) {
      return JSON.parse(beneficiaries)
        .filter((beneficiary: TBeneficiary) => {
          if (beneficiary.type !== type) return false;
          if (beneficiary.ownedBy !== currentUser?.id.toString() && process.env.NODE_ENV !== "test") return false;

          return true;
        })
        .reverse();
    }

    return [];
  };

  const handleSetBeneficiary = (type: TBeneficiary["type"], beneficiary: Omit<TBeneficiary, "ownedBy">) => {
    const beneficiaries = handleGetAllBeneficiaries(type);
    const isBeneficiaryExist = beneficiaries.some(
      (b: TBeneficiary) =>
        (beneficiary.accountNumber && b.accountNumber === beneficiary.accountNumber) ||
        (beneficiary.phoneNumber && b.phoneNumber === beneficiary.phoneNumber)
    );

    console.log({
      beneficiaries,
      isBeneficiaryExist,
    });

    if (isBeneficiaryExist) return;

    beneficiaries.push({
      ...beneficiary,
      ownedBy: currentUser?.id.toString() as string,
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.saveBeneficiary, JSON.stringify(beneficiaries));
  };

  return {
    handleGetAllBeneficiaries,
    handleSetBeneficiary,
  };
};

export default useSendMoneyBeneficiaries;
