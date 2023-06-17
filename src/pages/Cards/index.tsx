import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";

const Cards = () => {
  return (
    <>
    <GlobalStyles />
      <div>
        <h1>Cards</h1>
        <p> Something about Cards page</p>
        
      </div>
      <Navigation />
    </>
  );
};

export default Cards;
