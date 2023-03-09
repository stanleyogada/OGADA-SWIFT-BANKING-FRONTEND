import styled from "styled-components";
import config from "../../constants";

const { COLORS } = config;

const Button = styled.button`
  background: ${COLORS.blue};
  border-radius: 3px;
  border: 2px solid ${COLORS.blue};
  color: ${COLORS.white};
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default Button;
