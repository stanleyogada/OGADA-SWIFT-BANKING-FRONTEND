import { NavLink } from "react-router-dom";

import { CLIENT_ROUTES } from "@constants/routes";
import icons from "@constants/icons";

import HeaderWrapper from "./HeaderStyle";

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <NavLink to={CLIENT_ROUTES.home}>
          <i>{icons.backIcon()}</i>
        </NavLink>
        <h2>Live Chat</h2>
      </HeaderWrapper>
    </>
  );
};

export default Header;
