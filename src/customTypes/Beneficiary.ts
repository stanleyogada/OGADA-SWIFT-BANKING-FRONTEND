type TBeneficiary = {
  accountNumber?: string;
  avatar?: string;
  fullName?: string;
  bankName?: string;
  bankCode?: number;
  phoneNumber?: string;
  operator?: string;
  type: "in-house" | "bank" | "mobile";
  ownedBy: string;
};

export type { TBeneficiary };
