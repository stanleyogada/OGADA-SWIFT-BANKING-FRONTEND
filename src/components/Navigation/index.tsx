import { NavLink } from "react-router-dom";

import { Header, Nav, List } from "@components/styles/Navigation.styled";
import { CLIENT_ROUTES } from "@constants/routes";
import icons from "@constants/icons";

const Navigation = () => {
  return (
    <Header>
      <Nav>
        <ul>
          <List>
            <NavLink to={CLIENT_ROUTES.home}>
              <i>{icons.blackHomeIcon()}</i>
              <span>Home</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.rewards}>
              <i>{icons.blackHeartIcon()}</i>
              <span className="nav__name">Rewards</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.finance}>
              <i>{icons.blackChartIcon()}</i>
              <span>Finance</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.cards}>
              <i>{icons.blackCardIcon()}</i>
              <span>Cards</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.profile}>
              <i>{icons.blackMeIcon()}</i>
              <span>Profile</span>
            </NavLink>
          </List>
        </ul>
      </Nav>
    </Header>
  );
};

export default Navigation;
