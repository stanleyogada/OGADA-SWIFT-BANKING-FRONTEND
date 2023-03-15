import { ReactNode } from "react";
import styled from "styled-components";

import config from "../../constants";

const { COLORS } = config;

interface ButtonProps {
  icon: React.ReactNode;
  children?: ReactNode;
}
const SpanSyle = styled.span`
  margin-top: 5px;
  color: ${COLORS.black};
`;
const Button: React.FC<ButtonProps> = ({ icon, children }) => {
  return (
    <button>
      {icon}
      <SpanSyle> {children}</SpanSyle>
    </button>
  );
};
export default Button;
