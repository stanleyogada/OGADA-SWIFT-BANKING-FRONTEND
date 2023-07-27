import styled from "styled-components";

import { COLORS } from "@constants/colors";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 100px;
  min-height: min-content;
  max-height: fit-content;

  border-bottom: 2px solid hsla(214, 100%, 50%, 1);

  box-shadow: 0px 4px 4px 0px hsla(0, 0%, 0%, 0.25);

  background-color: ${COLORS.white};

  h2 {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    padding: 16px;
  }

  i {
    position: absolute;
    top: 12px;
    left: 8px;
    font-weight: bold;
    stroke: ${COLORS.black};
    stroke-width: 2;
    padding: 8px;
  }
`;
export default HeaderWrapper;
