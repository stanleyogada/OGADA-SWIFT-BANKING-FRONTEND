type TTransactionDetails = {
  transaction_id: number;
  created_at: string;
  transaction_type: string;
  amount: string;
  is_success: boolean;
  account_id: number;
  sender_account_number: string;
  receiver_account_number: string;
  is_deposit: boolean;
};

type TTransactionDetailsInHouse = {
  id: number;
  remark: string;
  receiver_account_number: string;
  sender_account_number: string;
  transaction_id: number;
};

type TTransactionDetailsBanks = {
  id: number;
  session_id: string;
  remark: string;
  bank_name: string;
  bank_account_full_name: string;
  bank_account_number: string;
  transaction_id: number;
};

type TTransactionDetailsRewards = {
  id: number;
  receiver_account_number: string;
  note: string;
  transaction_id: number;
};

type TTransactionDetailsMobile = {
  id: number;
  operator: string;
  phone_number: string;
  is_airtime: boolean;
  transaction_id: number;
};

export type {
  TTransactionDetails,
  TTransactionDetailsInHouse,
  TTransactionDetailsBanks,
  TTransactionDetailsRewards,
  TTransactionDetailsMobile,
};
