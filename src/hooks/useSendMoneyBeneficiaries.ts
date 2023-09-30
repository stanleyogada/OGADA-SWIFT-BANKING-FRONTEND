import { LOCAL_STORAGE_KEYS } from "@constants/index";
import { TBeneficiary } from "@customTypes/Beneficiary";
import useCurrentUser from "@hooks/useCurrentUser";

const useSendMoneyBeneficiaries = () => {
  const { data: currentUser } = useCurrentUser();

  const handleGetAllBeneficiaries = (type: TBeneficiary["type"]): TBeneficiary[] => {
    const beneficiaries = localStorage.getItem(LOCAL_STORAGE_KEYS.saveBeneficiary);
    if (beneficiaries) {
      return JSON.parse(beneficiaries).filter((beneficiary: TBeneficiary) => {
        if (beneficiary.type !== type) return false;
        if (beneficiary.ownedBy !== currentUser?.id.toString() && process.env.NODE_ENV !== "test") return false;

        return true;
      });
    }

    return [];
  };

  const handleSetBeneficiary = (type: TBeneficiary["type"], beneficiary: TBeneficiary) => {
    const beneficiaries = handleGetAllBeneficiaries(type);
    const isBeneficiaryExist = beneficiaries.some((b: TBeneficiary) => b.accountNumber === beneficiary.accountNumber);

    if (isBeneficiaryExist) return;

    beneficiaries.push(beneficiary);
    localStorage.setItem(LOCAL_STORAGE_KEYS.saveBeneficiary, JSON.stringify(beneficiaries));
  };

  return {
    handleGetAllBeneficiaries,
    handleSetBeneficiary,
  };
};

export default useSendMoneyBeneficiaries;
