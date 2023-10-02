import styled from "styled-components";

const InputWrapper = styled.div<{ hasTitle: boolean }>`
  width: 100%;

  padding: ${(props) => (props.hasTitle ? "20px 16px 0" : "0 16px")};

  input {
    margin-top: 15px;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
  }
`;

export default InputWrapper;
