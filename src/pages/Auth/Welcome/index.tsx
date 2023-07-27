import { Link } from "react-router-dom";
import Slider from "react-rc-carousel";

import WelcomeWrapper from "./WelcomeStyle";

import { COLORS } from "@constants/colors";
import vector from "@constants/images/vector";
import { CLIENT_ROUTES } from "@constants/routes";

import Button from "@components/Button";

const Welcome = () => {
  return (
    <WelcomeWrapper>
      <div>
        <div className="slider-wrapper">
          <Slider
            theme={{ color: COLORS.blue, backgroundColor: COLORS.gray }}
            isShowDots={{ isOut: false }}
            isShowButtons={false}
          >
            <div className="slide-box">
              <div className="slide-header"> Up to 15% Annual Interest on Wealth</div>
              <div className="slide-image">{vector.stats()}</div>
              <div className="slide-description">Flexible saving daliy interest and unlimited withdrawals for free</div>
            </div>

            <div className="slide-box">
              <div className="slide-header">Free Debit Card</div>
              <div className="slide-image">{vector.access()}</div>
              <div className="slide-description">
                Available without BVN, zero fee (Application, ATM withdrawals & Maintenace), and accepted any POS, ATM &
                online channel
              </div>
            </div>

            <div className="slide-box">
              <div className="slide-header"></div>
              <div className="slide-image">{vector.dollar()}</div>
              <div className="slide-description">
                Enjoy free transfers,free and instant payments, bonuses on transaction & more
              </div>
            </div>
          </Slider>

          <div className="create-account-btn">
            <Button link={CLIENT_ROUTES.authSignup}>Create an account</Button>
          </div>
        </div>

        <div className="signin-btn">
          <p>
            Have an account?
            <span>
              <Link to={CLIENT_ROUTES.authSignin}>Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </WelcomeWrapper>
  );
};

export default Welcome;
