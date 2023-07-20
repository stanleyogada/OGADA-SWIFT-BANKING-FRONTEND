import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SButton, LinkWrapper } from "./ButtonStyle";

interface ButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  link?: any;
}

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
