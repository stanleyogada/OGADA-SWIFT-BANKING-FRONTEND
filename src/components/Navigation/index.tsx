import { NavLink } from "react-router-dom";
import DisabledLink from "@components/DisabledLink";
import { Header, Nav, List } from "@components/styles/Navigation.styled";
import { CLIENT_ROUTES } from "@constants/routes";
import icons from "@constants/icons";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Header>
      <Nav>
        <ul>
          <List>
            <NavLink to={CLIENT_ROUTES.home}>
              <i>{icons.blackHomeIcon()}</i>
              <span className="nav__name">Home</span>
            </NavLink>
          </List>

          <List>
            <DisabledLink to={CLIENT_ROUTES.rewards}>
              <NavLink to={CLIENT_ROUTES.rewards}>
                <i>{icons.blackHeartIcon()}</i>
                <span className="nav__name">Rewards</span>
              </NavLink>
            </DisabledLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.finance}>
              <i>{icons.blackChartIcon()}</i>
              <span className="nav__name">Finance</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.cards}>
              <i>{icons.blackCardIcon()}</i>
              <span className="nav__name">Cards</span>
            </NavLink>
          </List>

          <List>
            <NavLink to={CLIENT_ROUTES.profile}>
              <i>{icons.blackMeIcon()}</i>
              <span className="nav__name">Profile</span>
            </NavLink>
          </List>
        </ul>
      </Nav>
    </Header>
  );
};

export default Navigation;
