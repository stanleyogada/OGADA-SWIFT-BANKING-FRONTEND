import useTransaction from "./hooks";

import PageNavHeader from "@components/PageNavHeader";
import TransactionCard, { TProps } from "@components/TransactionCard";

import TransactionWrapper from "./TransactionStyle";

const Transaction = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, setPageParam } = useTransaction();

  const mapData = () => {
    let _datas = data?.pages.map((page) =>
      page.data.map((item: TProps) => (
        <TransactionCard
          amount={item.amount}
          createdAt={item.createdAt}
          type={item.type}
          is_success={item.is_success}
        />
      ))
    );
    return _datas;
  };

  console.log(data);
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
          page.data.map((item: TProps) => (
            <TransactionCard
              amount={item.amount}
              createdAt={item.createdAt}
              type={item.type}
              is_success={item.is_success}
            />
          ))
        )}
        <div className="btn-wrapper">
          <button
            onClick={() => {
              fetchNextPage();
              setPageParam((page) => page + 1);
            }}
          >
            Load more
          </button>
        </div>
        <p data-testid="loading">{isFetching ? "loading" : ""}</p>
      </div>
    </TransactionWrapper>
  );
};

export default Transaction;
