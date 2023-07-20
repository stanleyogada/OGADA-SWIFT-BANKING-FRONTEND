import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MainWrapper } from "./LiveStyle";

const Livechat = () => {
  return (
    <>
      <Header />

      <MainWrapper>
        <div className="chat chat-container">
          <p className="chat chat-content">
            Hello Pay intelligenr robot will serve you, are you an agent or a user? What can I do for you?
          </p>
        </div>
      </MainWrapper>

      <Footer />
    </>
  );
};

export default Livechat;
