import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  box-shadow: 0 -2px 12px hsla(174, 63%, 15%, 0.25);

  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  display: grid;
  align-content: center;
  border-radius: 1.25rem 1.25rem 0 0;
  transition: 0.4s;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
  }

  li,
  a {
    display: flex;
  }

  a {
    flex-direction: column;
    align-items: center;
    row-gap: 0.25rem;
    color: ${COLORS.black};
    font-weight: 600;
    padding-top: 5px;
    text-decoration: none;
  }
`;

export const List = styled.li`
  a > span {
    font-size: 1rem;
    text-decoration: none;
  }

  a > i {
    font-size: 1.5rem;
  }
<<<<<<< HEAD
=======

  a.active {
    color: ${COLORS.blue}; /*This affects the SVG icons inside also*/
  }
>>>>>>> c1c6a7e750df1f9776ba3adf3c29ca7e488c4d20
`;
