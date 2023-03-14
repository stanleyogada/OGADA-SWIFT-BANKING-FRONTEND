import { ReactNode } from "react";
import styled from "styled-components";

import config from "../../constants";

const { COLORS } = config;

interface ButtonProps {
  icons: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icons }) => {
  return <button>{icons}</button>;
};
export default Button;
