import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ButtonWrapper, LinkWrapper } from "./ButtonWrapper";

type TProps = {
  icon?: ReactNode;
  children?: ReactNode | ReactNode[];
  link?: any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button = ({ icon, children, link, type, disabled, className, onClick }: TProps) => {
  const btn = (
    <ButtonWrapper type={type} disabled={disabled} className={className} onClick={onClick}>
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

export default Button;
