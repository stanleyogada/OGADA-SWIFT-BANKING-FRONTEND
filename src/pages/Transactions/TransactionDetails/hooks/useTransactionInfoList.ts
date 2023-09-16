import { getExactDay, getExactMonth } from "@utils/getDate";

import type { TTransactionDetails } from "@services/transaction/types";

const useTransactionInfoList = (transaction?: TTransactionDetails) => {
  const transactionDate = transaction ? new Date(transaction.created_at) : new Date();
  let transactionDay = transactionDate.getDay();
  let transactionMonth = transactionDate.getMonth();
  let transactionYear = transactionDate.getFullYear();
  let getDateInDesiredFormat = `${getExactDay(transactionDay)}, ${getExactMonth(transactionMonth)} ${transactionYear}`;

  if (transaction) transaction.created_at = getDateInDesiredFormat;

  let keys = Object.keys(transaction || {}).map((k) => k.split("_").join(" "));
  keys = keys.filter((key) => {
    if (key !== "transaction number" && key !== "receiver account number") {
      return key;
    }
  });
  const values = Object.values(transaction || {});

  const splitDataInFirstHalf = () => {
    let data = [];
    for (let i = 0; i < keys.length - 3; i++) {
      data.push({ value: values[i], _key: keys[i] });
    }

    return data;
  };

  const splitDataInSecondHalf = () => {
    let data = [];
    for (let i = keys.length - 3; i < keys.length; i++) {
      data.push({ value: values[i], _key: keys[i] });
    }

    return data;
  };

  return {
    firstHalf: splitDataInFirstHalf(),
    secondHalf: splitDataInSecondHalf(),
  };
};

export default useTransactionInfoList;
