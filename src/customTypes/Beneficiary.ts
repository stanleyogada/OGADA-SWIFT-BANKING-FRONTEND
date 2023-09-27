type TBeneficiary = {
  accountNumber?: string;
  avatar?: string;
  fullName?: string;
  bankName?: string;
  phoneNumber?: string;
  operator?: string;
  type: "in-house" | "bank" | "mobile";
};

export type { TBeneficiary };
