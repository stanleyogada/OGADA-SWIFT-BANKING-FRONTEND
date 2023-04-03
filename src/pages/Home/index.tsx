import { Link } from "react-router-dom";
import icons from "../../constants/icons";
import Button from "../../components/Button";
import Navigation from "../../components/Navigation";

import { ReactNode } from "react";

const Home = () => {
  return (
    <div className="space-y-4">
      <h1>Global Font Inter</h1>

      {/* EXAMPLES OF HOW ICONS IMPORTING WORKS */}
      <div className="space-x-4" style={{ backgroundColor: "orange" }}>
        <span>{icons.worldIcon()}</span>
        <span>{icons.loudspeakerIcon()}</span>
        <span>{icons.phoneIcon()}</span>
        <span>{icons.speakerIcon()}</span>
        <span>{icons.transferIcon()}</span>
        <span>{icons.addmoneyIcon()}</span>
        <span>{icons.eyeopenIcon()}</span>
        <span>{icons.eyecloseIcon()}</span>
        <span className="cursor-pointer">{icons.hashedaccountIcon()}</span>
        <span>{icons.blackcardIcon()}</span>
        <span>{icons.blackchartIcon()}</span>
        <span className="cursor-pointer">{icons.blackheartIcon()}</span>
        <span>{icons.blackhomeIcon()}</span>
        <span>{icons.blackmeIcon()}</span>
        <span>{icons.bluecardIcon()}</span>
        <span>{icons.bluechartIcon()}</span>
        <span>{icons.blueheartIcon()}</span>
        <span>{icons.bluehomeIcon()}</span>
        <span>{icons.bluemeIcon()}</span>
        <span>{icons.securityIcon()}</span>
        <span>{icons.userIcon()}</span>
        <span>{icons.dollarIcon()}</span>
        <span>{icons.transactionIcon()}</span>
        <span className="cursor-pointer">{icons.starIcon()}</span>
        <span>{icons.missrewardIcon()}</span>
        <span className="cursor-pointer">{icons.todayrewardIcon()}</span>
        <span className="cursor-pointer">{icons.collectedrewardIcon()}</span>
        <span>{icons.blueleftarrowIcon()}</span>
        <span>{icons.blackleftarrowIcon()}</span>
        <span>{icons.bluerightarrowIcon()}</span>
        <span className="cursor-pointer">{icons.blackrightarrowIcon()}</span>
        <span>{icons.bellIcon()}</span>
        <span>{icons.blueprofileIcon()}</span>
        <span className="cursor-pointer">{icons.blackuserIcon()}</span>
      </div>

      <Button>text</Button>
      <Button icon={icons.phoneIcon()}>text</Button>
      <Button icon={icons.phoneIcon()} link={"#"}>
        text
      </Button>
      <Link to="/about">About page</Link>

      <Navigation/>


    </div>
  );
};

export default Home;
