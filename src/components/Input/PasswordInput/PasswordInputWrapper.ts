import styled from "styled-components";

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;

  .eye {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 11px;
    border: solid;
  }

  input {
    flex: 1;
    padding-right: 40px;
  }
`;

export default PasswordInputWrapper;
