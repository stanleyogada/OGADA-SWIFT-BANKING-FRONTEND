import { transactionInstance } from "@utils/axiosInstance";

const getTransactions = async ({ pageNumber = 1 }) => {
  return await transactionInstance.get(`/trans?_limit=4&_page=${pageNumber}`);
};

export { getTransactions };
