import { ENDPOINTS } from "@constants/services";
import { axiosInstance } from "@utils/axiosInstance";

const getTransactions = async ({ pageNumber }: { pageNumber: number }): Promise<[]> => {
  const { data } = await axiosInstance({
    method: "GET",
    url: `${ENDPOINTS.transactionAll}?_limit=4&_page=${pageNumber}`,
  });

  return data.data;
};

export { getTransactions };
