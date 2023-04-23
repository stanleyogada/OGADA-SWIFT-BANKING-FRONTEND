import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import config from "../../constants";

const { COLORS } = config;

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
    color: ${COLORS.black};
  }

  
`;
const Button: React.FC<ButtonProps> = ({ icon, children, link }) => {
  const btn = (
    <SButton>
      {icon && <div data-testid="btn-icon">{icon}</div>}
      <span >{children}</span>
    </SButton>
  );

  return link ? (
    <Link data-testid="btn-link" to={link}>
      {btn}
    </Link>
  ) : (
    btn
  );
};
export default Button;
