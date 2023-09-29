import { finances } from "./Finance";
import FinanceWrapper from "./FinanceStyle";
import Tabs from "@components/Tabs/Tabs";

const Finance = () => {
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

        <Tabs
          data={[
            {
              id: "savings",
              heading: "Savings",
            },
            {
              id: "loan",
              heading: "Loan",
            },
          ]}
        >
          <div className="finance-tab">
            {finances[0].finContent.map((content, index) => {
              return (
                <div key={index} style={{ backgroundColor: content.bgColor }} className="finance-content">
                  <h4 style={{ color: content.textColor }}>{content.title}</h4>
                  <p>{content.content}</p>
                  <h5 style={{ color: content.textColor }}>{content.textNumb}</h5>
                </div>
              );
            })}
          </div>

          <div className="finance-tab">
            {finances[1].finContent.map((content, index) => {
              return (
                <div key={index} style={{ backgroundColor: content.bgColor }} className="finance-content">
                  <h4 style={{ color: content.textColor }}>{content.title}</h4>
                  <p>{content.content}</p>
                  <h5 style={{ color: content.textColor }}>{content.textNumb}</h5>
                </div>
              );
            })}
          </div>
        </Tabs>
      </FinanceWrapper>
    </>
  );
};

export default Finance;
