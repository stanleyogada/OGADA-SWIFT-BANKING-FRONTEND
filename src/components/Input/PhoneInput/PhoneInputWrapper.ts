import styled from "styled-components";

const PhoneInputWrapper = styled.div`
  position: relative;
  display: flex;

  .country {
    display: flex;
    gap: 11px;
    padding-right: 11px;
    border-right: 1px solid;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 11px;

    &__flag {
      /* .img { */
      width: 32px;
      height: 20px;
      border: solid;
      /* } */
    }
  }

  input {
    flex: 1;
    padding-left: 120px;
  }
`;

export default PhoneInputWrapper;
