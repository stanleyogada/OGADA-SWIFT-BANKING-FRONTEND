import BrandLogo from "../BrandLogo";

import { SplashScreenWrapper } from "./SplashScreenStyle";

export default function SplashScreen() {
  return (
    <SplashScreenWrapper>
      <div>
        <div className="brand-logo-wrapper">
          <BrandLogo />
        </div>

        <div className="content">
          <div className="logo-label"> Welcome to Opay </div>
          <div className="description">We offer the best</div>
        </div>
      </div>
    </SplashScreenWrapper>
  );
}
