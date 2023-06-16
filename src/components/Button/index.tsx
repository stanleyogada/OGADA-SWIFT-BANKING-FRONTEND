import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";

interface ButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  link?: any;
}

const SButton = styled.button`
  background-color: Transparent;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  border: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  & span {
    margin-top: 5px;
    color: ${COLORS.white};
  }
`;

const LinkWrapper = styled.div`
  & a {
    text-decoration: none;
  }
`;
const Button: React.FC<ButtonProps> = ({ icon, children, link }) => {
  const btn = (
    <SButton>
      {icon && <div data-testid="btn-icon">{icon}</div>}
      <span>{children}</span>
    </SButton>
  );

  return link ? (
    <LinkWrapper>
      <Link data-testid="btn-link" to={link}>
        {btn}
      </Link>
    </LinkWrapper>
  ) : (
    btn
  );
};
export default Button;
