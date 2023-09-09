import { getTransactions } from "@services/transaction";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";

const useTransaction = () => {
  const [pageParams, setPageParam] = useState(0);

  let { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, refetch } = useInfiniteQuery(
    ["transaction"],
    () => getTransactions({ pageNumber: pageParams }),
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

export default useTransaction;
