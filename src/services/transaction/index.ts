import { transactionInstance } from "@utils/axiosInstance";

const getTransactions = async ({ pageNumber }: { pageNumber: number }) => {
  const { data } = await transactionInstance.get(`/trans?_limit=4&_page=${pageNumber}`);

  return data;
};

export { getTransactions };
