import { useInfiniteQuery } from "react-query";
import { Fragment, useState } from "react";
import { getTransactions } from "@services/transaction";
const Transaction = () => {
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
      refetchOnWindowFocus: true,
    }
  );

  return (
    <div>
      <ul>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((data: { T_id: number; type: string }) => {
                return <li>{data.T_id}</li>;
              })}
            </Fragment>
          );
        })}
      </ul>
      <button
        onClick={() => {
          setPageParam((pageParams) => pageParams + 1);
          fetchNextPage();
        }}
        disabled={!hasNextPage}
      >
        load more
      </button>
      <div>{isFetching && isFetchingNextPage ? "Fetching more" : null}</div>
    </div>
  );
};

export default Transaction;
