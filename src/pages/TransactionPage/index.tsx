import useTransaction from "./hooks";

import PageNavHeader from "@components/PageNavHeader";
import TransactionCard from "@components/TransactionCard";

import TransactionWrapper from "./TransactionStyle";

const Transaction = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, setPageParam } = useTransaction();
  return (
    <TransactionWrapper>
      <div className="transaction-container">
        <div className="transaction-header">
          <PageNavHeader heading="transactions"></PageNavHeader>
          <div className="categories-section">
            <p>All categories</p>
            <p>Any status</p>
          </div>
        </div>

        <div className="date">
          <p> 2022/12/19 - 2023/02/17 </p>
        </div>

        {data?.pages.map((datas) => {
          return datas.data.map((data: { T_id: number; type: string }) => {
            return <TransactionCard />;
          });
        })}

        <div className="btn-wrapper">
          <button onClick={() => fetchNextPage()}>{hasNextPage ? "load more" : "no more data"}</button>
        </div>
      </div>
    </TransactionWrapper>
  );
};

export default Transaction;
