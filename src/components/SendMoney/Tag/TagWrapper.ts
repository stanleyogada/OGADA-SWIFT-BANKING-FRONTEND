import { COLORS } from "@constants/colors";
import styled from "styled-components";

const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .content {
    width: 95%;
    background-color: ${COLORS.lightBlue};
    padding: 12px;
    border-radius: 10px;
    color: ${COLORS.blue};
    margin: 20px 0px;
    border: 2px solid;
    font-weight: bold;
    opacity: 0.7;
  }
`;

export default TagWrapper;
