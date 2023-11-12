import BrandLogo from "../BrandLogo";

import SplashScreenWrapper from "./SplashScreenStyle";

export default function SplashScreen() {
  return (
    <SplashScreenWrapper>
      <div data-testid="splash-screen">
        <div className="brand-logo-wrapper">
          <BrandLogo />
        </div>

        <div className="content">
          <div className="logo-label">Welcome to OGADA SWIFT BANKING</div>
          <div className="description">Offering the best services (DEMO!)</div>
        </div>
      </div>
    </SplashScreenWrapper>
  );
}
