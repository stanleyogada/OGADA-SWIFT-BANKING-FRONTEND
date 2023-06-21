import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";
import VirtualCard from "./../../components/VirtualCard/index";

import PhysicalCard from "../../components/PhysicalCard";
import Tabs from "../../components/Tabs/Tabs";

const CardName = [
  {
    heading: "Physical Card",
    id: "1",
  },
  {
    heading: "Virtual Card",
    id: "2",
  },
];
const Cards = () => {
  return (
    <>
      <CardsWrapper>
        <div className="title">
          <div className="card">Cards</div>
          <div className="question">Q&A</div>
        </div>

        <Tabs data={CardName}>{[<PhysicalCard />, <VirtualCard />]}</Tabs>

        <Navigation />
      </CardsWrapper>
    </>
  );
};

export default Cards;

const CardsWrapper = styled.div`
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 10px 15px;
    .card {
      font-weight: 700;
      font-size: 25px;
    }
    .question {
      font-weight: 400;
      font-size: 15px;
      color: ${COLORS.blue};
    }
  }
  .card-title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .card-title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 1rem 3rem 1rem 1.4rem;

      align-items: center;
      .physical-card {
        font-size: 15px;
        font-weight: 500;
        line-height: 18.15px;
      }
      .virtual-card {
        font-size: 15px;
        font-weight: 500;
        line-height: 18.15px;
      }
    }
  }
`;
