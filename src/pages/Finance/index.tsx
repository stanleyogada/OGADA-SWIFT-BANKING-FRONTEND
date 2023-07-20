import { useState } from "react";

import Navigation from "../../components/Navigation";
import { finances } from "./Finance";
import FinanceWrapper from "./FinanceStyle";

const Finance = () => {
  const [value, setValue] = useState(0);
  const [financialNote, setFinancialNote] = useState(finances);
  const { finContent } = financialNote[value];

  return (
    <>
      <FinanceWrapper>
        <h3 className="top-header">Finance</h3>
        <div className="finance-hero">
          <h4>
            Make Transfer Directly <br /> With Owealth
          </h4>
          <button> Get Started</button>
        </div>
        {/* Fin Top Tab Title */}
        <div className="finances-section">
          {finances.map((finance, index) => {
            return (
              <div key={index} className="finance">
                <button className={`finance-btn ${index === value && "active-btn"}`} onClick={() => setValue(index)}>
                  {finance.finTitle}
                </button>
              </div>
            );
          })}
        </div>
        {/* Fin Tab Content */}
        <div className="finance-tab">
          {finContent.map((content, index) => {
            return (
              <div key={index} style={{ backgroundColor: content.bgColor }} className="finance-content">
                <h4 style={{ color: content.textColor }}>{content.title}</h4>
                <p>{content.content}</p>
                <h5 style={{ color: content.textColor }}>{content.textNumb}</h5>
              </div>
            );
          })}
        </div>
        <Navigation />
      </FinanceWrapper>
    </>
  );
};

export default Finance;
