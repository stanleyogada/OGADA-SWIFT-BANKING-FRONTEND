import { Link } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import Navigation from "../../components/Navigation";
import GlobalStyles from "../../components/styles/Global";

const Profile = () => {
  return (
    <>
    <GlobalStyles />
      <div>
        <h1>Profile</h1>
        <p> Something about Profile page</p>
        
      </div>
      <Navigation />
    </>
  );
};

export default Profile;
