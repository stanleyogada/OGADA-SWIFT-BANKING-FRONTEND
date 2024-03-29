import { COLORS } from "@constants/colors";
import styled from "styled-components";

const EditAccountWrapper = styled.div`
  width: 100%;

  .content-wrapper {
    padding: 25px 10px 20px 10px;

    .personalIfo {
      margin: 10px 0;
    }
    .line {
      background: ${COLORS.blue};
      margin: 10px 0;
    }
    .paragraph {
      font-size: 18px;
      font-weight: 400;
    }
    .addressIfo {
      margin: 10px 0;
    }

    .updateUser {
      color: blue;
    }

    .update-passcode,
    .update-pin {
      color: ${COLORS.blue};
      cursor: pointer;
      font-weight: 600;
      padding: 12px;
    }
  }
`;

export default EditAccountWrapper;
