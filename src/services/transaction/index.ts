import { ENDPOINTS } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";

type TTransaction = {
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

const getTransactions = async ({ pageNumber }: { pageNumber: number }): Promise<[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.transactionAll}?_limit=4&_page=${pageNumber}`,
  });

  return data.data;
};

export { getTransactions };
