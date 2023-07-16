import styled from "styled-components";

const PhoneInputWrapper = styled.div`
  position: relative;
  display: flex;

  .country {
    display: flex;
    align-items: center;
    gap: 11px;
    padding-right: 11px;
    border-right: 1px solid;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 11px;
  }

  input {
    flex: 1;
    padding-left: 120px;
    border: 2px solid blue;
  }
`;

export default PhoneInputWrapper;
