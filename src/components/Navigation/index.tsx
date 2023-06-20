import { NavLink } from "react-router-dom";
import { CLIENT_ROUTES } from "../../constants";
import icons from "../../constants/icons";
import { Header, Nav, List } from "../styles/Navigation.styled";

const Navigation = () => {
  return (
    <Header>
      <Nav>
        <ul>

          <List>
            <NavLink to={CLIENT_ROUTES.home}>
              <i>{icons.blackhomeIcon()}</i>
              <span>Home</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.rewards}>
              <i>{icons.blackheartIcon()}</i>
              <span className="nav__name">Rewards</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.finance}>
              <i>{icons.blackchartIcon()}</i>
              <span>Finance</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.cards}>
              <i>{icons.blackcardIcon()}</i>
              <span>Cards</span>
            </NavLink>
          </List>

          <List>
            <NavLink  to={CLIENT_ROUTES.profile}>
              <i>{icons.blackmeIcon()}</i>
              <span>Profile</span>
            </NavLink>
          </List>

        </ul>
      </Nav>
    </Header>
  );
}

export default Navigation;