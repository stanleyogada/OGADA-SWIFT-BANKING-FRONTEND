import { COLORS } from "@constants/colors";
import { TBank } from "@services/banks/types";
import styled from "styled-components";

const InputWrapper = styled.div<{ hasTitle: boolean; isVisible?: TBank | null | undefined; muteMargin?: boolean }>`
  width: 100%;
  display: ${(props) => (props.isVisible ? "none" : "block")};

  padding: ${(props) => (props.hasTitle ? "20px 16px 0" : "0 16px")};

  input {
    margin-top: ${(props) => (props.muteMargin ? "0" : "16px")};
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 2px solid transparent;

    &:disabled {
      border-color: ${COLORS.lightGray};
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
`;

export default InputWrapper;
