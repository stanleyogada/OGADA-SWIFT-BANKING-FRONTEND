import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";
// import useRedirectToAuthPage from "../../hooks/useRedirectToAuthPage";

const About = () => {
  // useRedirectToAuthPage();

  return (
    <>
      <GlobalStyles />
      <h1>About page</h1>
      <Link to="/">Homepages</Link>
      <Navigation />
    </>
  );
};

export default About;
