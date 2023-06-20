import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

import VirtualCard from "./../../components/VirtualCard/index";
import Navigation from "./../../components/Navigation/index";

const Cards = () => {
  return (
    <>
      <CardsWrapper>
        <div className="title">
          <div className="card">Cards</div>
          <div className="question">Q&A</div>
        </div>
        <div className="card-title-wrapper">
          <div className="card-title">
            <p className="physical-card">Physical Card</p>
            <p className="virtual-card">Virtual Card</p>
          </div>
        </div>
        <VirtualCard />
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
