import { transactionInstance } from "@utils/axiosInstance";

const getTransactions = async ({ pageNumber }: { pageNumber: number }) => {
  return await transactionInstance.get(`/trans?_limit=2&_page=${pageNumber}`);
};

export { getTransactions };
