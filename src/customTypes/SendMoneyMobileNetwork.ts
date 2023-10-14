type TSendMoneyMobileNetwork = {
  id: string;
  name: string;
  logo: string;
};

type TSendMoneyMobileBundle = {
  amount: number;
  data?: string;
  validity?: string;
  tag?: string;
};

export type { TSendMoneyMobileNetwork, TSendMoneyMobileBundle };
