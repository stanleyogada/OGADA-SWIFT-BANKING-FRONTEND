import { ReactNode } from "react";
import styled from "styled-components";

import config from "../../constants";

const { COLORS } = config;

interface ButtonProps {
  icons: React.ReactNode;
  children?: ReactNode;
}
const SpanSyle = styled.span`
  margin-top: 5px;
  color: ${COLORS.black};
`;
const Button: React.FC<ButtonProps> = ({ icons, children }) => {
  return (
    <button>
      {icons}
      <SpanSyle> {children}</SpanSyle>
    </button>
  );
};
export default Button;
