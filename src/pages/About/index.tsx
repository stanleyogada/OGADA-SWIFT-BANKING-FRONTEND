import Navigation from "@components/Navigation";
import PageNavHeader from "@components/PageNavHeader";
import GlobalStyles from "@components/styles/Global";

const About = () => {
  return (
    <>
      <GlobalStyles />
      <PageNavHeader heading="About" />

      <p> Something about the App page</p>

      <Navigation />
    </>
  );
};

export default About;
