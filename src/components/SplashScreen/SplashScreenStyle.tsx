import styled from "styled-components";
import { COLORS } from "../../constants";

export const SplashScreenWrapper = styled.div`
  background-color: ${COLORS.blue};
  width: 100%;
  height: 100vh;
  text-align: center;
  position: relative;

  .brand-logo-wrapper {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }

  .content {
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);

    .logo-label {
      color: white;
      font-size: 25px;
      font-weight: 700;
      margin-top: 40%;
      width: 80vw;
    }

    .description {
      color: white;
      font-size: 10px;
      border: 1px solid white;
      border-radius: 5px;
      padding: 8px 0px;
      margin-top: 14px;
    }
  }
`;
