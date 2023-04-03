import { Link } from "react-router-dom";
import icons from "../../constants/icons";
import Button from "../Button";
import { ReactNode } from "react";
import { Header, Nav, List } from "../styles/Navigation.styled";

const Navigation = () => {
  return (
    <Header>
      <Nav>
        <ul>

          <List>
            <Link to="/">
              <i>{icons.blackhomeIcon()}</i>
              <span>Home</span>
            </Link>
          </List>

          <List>
            <Link to="/rewards">
              <i>{icons.blackheartIcon()}</i>
              <span className="nav__name">Rewards</span>
            </Link>
          </List>

          <List>
            <Link to="/">
              <i>{icons.blackchartIcon()}</i>
              <span>Finance</span>
            </Link>
          </List>

          <List>
            <Link to="/">
              <i>{icons.blackcardIcon()}</i>
              <span>Cards</span>
            </Link>
          </List>

          <List>
            <Link to="/">
              <i>{icons.blackmeIcon()}</i>
              <span>Profile</span>
            </Link>
          </List>

        </ul>
      </Nav>
    </Header>
  );
}

export default Navigation;