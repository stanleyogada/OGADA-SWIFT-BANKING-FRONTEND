import styled from "styled-components";
import { COLORS } from "@constants/colors";

const CardsWrapper = styled.div`
  width: 100%;
  height: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 10px 15px;
    .card {
      font-weight: 700;
      font-size: 25px;
    }
    .question {
      font-weight: 400;
      font-size: 15px;
      color: ${COLORS.blue};
    }
  }
  .card-title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .card-title {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 1rem 3rem 1rem 1.4rem;

      align-items: center;
      .physical-card {
        font-size: 15px;
        font-weight: 500;
        line-height: 18.15px;
      }
      .virtual-card {
        font-size: 15px;
        font-weight: 500;
        line-height: 18.15px;
      }
    }
  }
`;
export default CardsWrapper;
