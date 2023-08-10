import { useInfiniteQuery } from "react-query";
import { Fragment, useState } from "react";
import { getTransactions } from "@services/transaction";
const Transaction = () => {
  let { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ["transaction"],
    () => getTransactions({ pageNumber: 1 }),
    {
      getNextPageParam: (_lastPage, page) => {
        if (page.length < 2) {
          return page.length + 1;
        } else {
          return undefined;
        }
      },
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
