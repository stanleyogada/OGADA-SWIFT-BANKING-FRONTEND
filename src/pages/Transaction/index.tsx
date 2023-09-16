import useTransaction from "./hooks";

import PageNavHeader from "@components/PageNavHeader";
import TransactionCard from "@components/TransactionCard";
import TransactionWrapper from "./TransactionStyle";

const Transaction = () => {
  const { data, fetchNextPage, isFetching, setPageParam } = useTransaction();

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
        {data?.pages.map((page) =>
          page.map((item) => (
            <TransactionCard
              key={item.transaction_id}
              amount={item.amount}
              created_at={item.created_at}
              transaction_type={item.transaction_type}
              is_success={item.is_success}
              is_deposit={item.is_deposit}
            />
          ))
        )}
        <div className="btn-wrapper">
          <button
            onClick={() => {
              fetchNextPage();
              setPageParam((page) => page + 1);
            }}
            disabled={isFetching}
          >
            Load more
          </button>
        </div>
        {isFetching && <p data-testid="loading">loading</p>}
      </div>
    </TransactionWrapper>
  );
};

export default Transaction;