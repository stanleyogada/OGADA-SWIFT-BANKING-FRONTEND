import { transactionInstance } from "@utils/axiosInstance";

const getTransactions = async () => {
  let { data } = await transactionInstance.get("/trans");
  return data;
};

export { getTransactions };
