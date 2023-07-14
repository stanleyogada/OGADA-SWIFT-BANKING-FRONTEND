import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";

type TProps = {
  icon?: ReactNode;
  children?: ReactNode;
  link?: any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const Button = ({ icon, children, link, type, disabled, className }: TProps) => {
  const btn = (
    <ButtonWrapper type={type} disabled={disabled} className={className}>
      {icon && <div data-testid="btn-icon">{icon}</div>}
      <span>{children}</span>
    </ButtonWrapper>
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

const ButtonWrapper = styled.button`
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

export default Button;
