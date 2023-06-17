import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";

const About = () => {
  return (
    <>
      <GlobalStyles />
      <h1>About page</h1>
      <p> Something about the App page</p>

      <Navigation />
    </>
  );
};

export default About;
