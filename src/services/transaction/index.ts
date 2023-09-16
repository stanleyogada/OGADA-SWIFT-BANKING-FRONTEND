import { ENDPOINTS } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";
import { ETransactionAllType, TTransactionAll } from "./types";
import { CLIENT_ROUTES } from "@constants/routes";
import { TTransactionDetails } from "@services/transactionDetails/types";

const getAllTransactions = async ({ pageNumber }: { pageNumber: number }): Promise<TTransactionAll[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.transactions}?_limit=4&_page=${pageNumber}`,
  });

  return data.data;
};

const getOneTransaction = async (type: ETransactionAllType, id: string) => {
  const response = await axiosInstance({
    method: "GET",
    url: `${CLIENT_ROUTES.allTransactions}/${type}/${id}`,
  });

  return response.data.data as TTransactionDetails;
};

export { getAllTransactions, getOneTransaction };
