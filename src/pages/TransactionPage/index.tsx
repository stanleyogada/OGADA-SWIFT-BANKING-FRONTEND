import { Fragment } from "react";

import useTransaction from "./hooks";

const Transaction = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, setPageParam } = useTransaction();

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
