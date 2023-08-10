import { getTransactions } from "@services/transaction";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

const useTransaction = () => {
  const [pageParams, setPageParam] = useState(1);

  let { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ["transaction"],
    () => getTransactions({ pageNumber: pageParams }),
    {
      getNextPageParam: (_lastPage, page) => {
        if (page.length < 6) {
          return page.length + 1;
        } else {
          return undefined;
        }
      },
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    setPageParam,
  };
};

export default useTransaction;
