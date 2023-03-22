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
const SpanSyle = styled.span`
  margin-top: 5px;
  color: ${COLORS.black};
`;
const Button: React.FC<ButtonProps> = ({ icon, children, link }) => {
  const btn = (
    <button>
      {icon && <div data-testid="btn-icon">{icon}</div>}
      <SpanSyle>{children}</SpanSyle>
    </button>
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
