import { useState } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import { COLORS } from "../../constants";
import { finances } from "./Finance";

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

const FinanceWrapper = styled.section`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .top-header {
    padding: 1.5rem 1rem 0.75rem 1rem;
    background: ${COLORS.white};
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .finance-hero {
    padding: 1.2rem;
    background: ${COLORS.gray};

    h4 {
      color: ${COLORS.purple};
      margin-bottom: 1rem;
      font-weight: bold;
      font-size: 1.2rem;
    }

    button {
      background: ${COLORS.purple};
      color: ${COLORS.lightPurple};
      padding: 0.35rem 0.75rem 0.35rem 0.75rem;
      border: none;
      border-radius: 15px;
      font-weight: 500;
      font-size: 13px;
    }
  }

  .finances-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100vw;
    margin-left: 0rem;
    margin-bottom: 0.85rem;
    background-color: ${COLORS.gray};

    .finance {
      background-color: ${COLORS.gray};

      .finance-btn {
        border: transparent;
        text-transform: capitalize;
        font-size: 20px;
        letter-spacing: 2px;
        -webkit-transition: all 0.3s linear;
        transition: all 0.3s linear;
        cursor: pointer;
        padding: 0.2rem 0;
        line-height: 1;
        padding: 0.85rem;
        background-color: ${COLORS.gray};
        color: ${COLORS.black};
        width: 100%;
        font-weight: 700;
        transition: all 0.5s linear;
      }

      .active-btn {
        color: ${COLORS.blue};
        width: 100%;
        background-color: ${COLORS.white};
        font-weight: 700;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        border: transparent;
        transition: all 0.5s linear;
        font-size: 20px;
      }
    }
  }

  .finance-tab {
    width: 90vw;
    max-width: 95vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    .finance-content {
      border-radius: 0.5rem;
      padding: 0.6rem 0.55rem;

      p {
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.65rem 0;
      }
      h4 {
        font-weight: bold;
        font-size: 20px;
      }
      h5 {
        font-weight: 400;
        font-size: 15px;
      }
    }
  }
`;
