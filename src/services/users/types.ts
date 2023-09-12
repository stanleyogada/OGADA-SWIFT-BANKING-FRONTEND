type TUser = {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  nickname?: string;
  email: string;
  email_is_verified: boolean;
  phone: string;
  avatar?: string;
};

type TUserAccount = {
  user_id: number;
  created_at: string;
  email: string;
  account_number: string;
  account_id: number;
  balance: TUserAccountType;
  type: string;
  full_name: string;
};

type TUserAccountType = "NORMAL" | "CASHBACK";

export type { TUser, TUserAccount, TUserAccountType };
