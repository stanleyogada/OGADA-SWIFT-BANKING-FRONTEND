import { Navigate, useParams } from "react-router-dom";
import { ETransactionAllType, TTransactionAll } from "@services/transaction/types";
import PageNavHeader from "@components/PageNavHeader";
import styled from "styled-components";
import getTransactionIcon from "@utils/getTransactionIcon";
import useGetOneTransaction from "./hook/useGetOneTransaction";
import useTransactionInfoList from "./hook/useTransactionInfoList";
import TransactionInfo from "@components/TransactionInfo";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { CLIENT_ROUTES } from "@constants/routes";

const TransactionInfoList = ({
  data,
}: {
  data: {
    value: string | number | boolean;
    _key: string;
  }[];
}) => {
  return (
    <>
      {data.map((item, idx) => (
        <TransactionInfo key={idx} _key={item._key} value={item.value} />
      ))}
    </>
  );
};

const Details = () => {
  const { type, id } = useParams();

  const { data, is404Error } = useGetOneTransaction(type as string, id as string);

  const { firstHalf, secondHalf } = useTransactionInfoList(data as TTransactionAll);

  return (
    <DetailsWrapper>
      <div className="details">
        <PageNavHeader heading="Transaction Details" />

        <div className="details-container">
          <div className="amountWrapper">
            <div className="type-wrapper">
              <div className="transactionIcon">{getTransactionIcon(type as ETransactionAllType)}</div>
              <div>{type}</div>
            </div>
            <div className="amount" data-testid="params">
              {data?.amount}
            </div>
          </div>

          {data && <TransactionInfoList data={firstHalf} />}

          <div className="date-section">
            <div className="line"></div>
            <div className="date-wrapper">Jul 7th, 22:36</div>
          </div>
          {data && <TransactionInfoList data={secondHalf} />}

          <div className="line2"></div>
        </div>

        <div className="transaction-number">
          <div className="transaction-title">Transaction number</div>
          <div className="number">29404724790849245972</div>
        </div>

        {/* <button className="receipt-btn">Share Receipt</button> */}

        {/* {is404Error && <Error404 is404Error={is404Error} />} */}

        {is404Error && <div data-testid="error404">404</div>}
      </div>
    </DetailsWrapper>
  );
};

const Error404 = ({ is404Error }: { is404Error: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (is404Error) {
      console.log({
        is404Error,
      });
      navigate(CLIENT_ROUTES._404);
    }
  }, [is404Error]);

  return <div data-testid="error404">404</div>;
};

export default Details;

const DetailsWrapper = styled.div`
  width: 100%;
  height: 100%;

  .details {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column;

    .details-container {
      width: 90%;
      height: auto;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
      flex-shrink: 0;

      .amountWrapper {
        display: flex;
        justify-content: space-between;
        margin: 20px;
        align-items: center;

        .type-wrapper {
          display: flex;
          align-items: center;
          color: #707070;
          font-family: Inter;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;

          .transactionIcon {
            margin-right: 5px;
          }
        }
      }

      .transaction-info {
        width: 100%;
        padding: 0px 10px;
        color: #707070;
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 10px;
        text-transform: capitalize;

        .infoWrapper {
          width: 95%;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .date-section {
      position: relative;
      width: 100%;
      height: 20px;
      margin-top: 30px;

      .line {
        width: 100%;
        height: 1px;
        background: #e8e8e8;
        position: absolute;
        z-index: 0;
      }

      .date-wrapper {
        position: absolute;
        width: 100px;
        height: 40px;
        border-radius: 18px;
        border: 1px solid #e8e8e8;
        left: 50%;
        z-index: 2;
        top: -15px;
        transform: translateX(-50%);
        background-color: white;
        color: #000;
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .line2 {
      width: 90%;
      height: 1px;
      background: #e8e8e8;
      margin: 20px;
    }
  }

  .transaction-number {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 40px 20px 20px 20px;
    color: #000;
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .receipt-btn {
    width: 95%;
    background-color: #006fff;
    height: 50px;
    margin: 0 auto;
    border-radius: 10px;
    border: none;
    margin-top: 30px;
    color: #fff;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
