import PhysicalCard from "@components/PhysicalCard";

import Tabs from "@hooks/Tabs";

import CardsWrapper from "./CardsStyle";

import VirtualCard from "@components/VirtualCard";
import Navigation from "@components/Navigation";

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
