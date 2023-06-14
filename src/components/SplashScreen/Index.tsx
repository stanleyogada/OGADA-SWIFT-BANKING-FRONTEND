import styled from "styled-components";
import { COLORS } from "../../constants";
import BrandLogo from "../BrandLogo";

export default function SplashScreen() {
  return (
    <SplashScreenWrapper>
      <div>
        <BrandLogo />

        <div> Welcome to Opay </div>
      </div>
    </SplashScreenWrapper>
  );
}

const SplashScreenWrapper = styled.div`
  background-color: ${COLORS.blue};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
