import React from "react";
import Navigation from "../../components/Navigation";
import VirtualCard from "./../../components/VirtualCard/index";
import PhysicalCard from "../../components/PhysicalCard";
import Tabs from "../../hooks/Tabs";
import CardsWrapper from "./CardsStyle";

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
