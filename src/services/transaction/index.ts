import { ENDPOINTS } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";
import { TTransactionAll } from "./types";

const geTTransactionAlls = async ({ pageNumber }: { pageNumber: number }): Promise<TTransactionAll[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.transactionAll}?_limit=4&_page=${pageNumber}`,
  });

  return data.data;
};

export { geTTransactionAlls };
