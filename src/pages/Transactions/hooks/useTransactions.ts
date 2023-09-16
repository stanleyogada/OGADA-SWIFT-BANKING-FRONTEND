import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import { getAllTransactions } from "@services/transaction";

const useTransactions = () => {
  const [pageParams, setPageParam] = useState(0);

  let { data, fetchNextPage, isFetching, refetch } = useInfiniteQuery(
    ["transaction"],
    () => getAllTransactions({ pageNumber: pageParams }),
    {
      getNextPageParam: (_lastPage, page) => {
        if (page.length < 16) {
          return page.length + 1;
        } else {
          return undefined;
        }
      },
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
    setPageParam((page) => page + 1);
  }, []);

  return {
    data,
    fetchNextPage,
    isFetching,
    setPageParam,
  };
};

export default useTransactions;
