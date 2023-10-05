import PhysicalCard from "@components/PhysicalCard";
import Tabs from "@components/Tabs/Tabs";
import VirtualCard from "@components/VirtualCard";
import Navigation from "@components/Navigation";
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
      </CardsWrapper>
    </>
  );
};

export default Cards;
