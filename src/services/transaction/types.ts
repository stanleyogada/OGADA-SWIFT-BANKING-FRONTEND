type TTransactionAll = {
  transaction_id: number;
  created_at: string;
  transaction_type: string;
  amount: string;
  is_success: boolean;
  account_id: number;
  sender_account_number: string;
  receiver_account_number: string;
  is_deposit: boolean;
  transaction_number: string;
};
enum ETransactionAllType {
  IN_HOUSES = "in-houses",
  MOBILES = "mobiles",
  REWARDS = "rewards",
  BANKS = "banks",
}

export type { TTransactionAll };

export { ETransactionAllType };
