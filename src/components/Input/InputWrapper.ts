import styled from "styled-components";
import { COLORS } from "../../constants";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    flex: 1;
    border: none;
    border-radius: 9px;
    background: ${COLORS.gray};
    padding: 11px;
    font-size: 15px;
  }
`;

export default InputWrapper;
