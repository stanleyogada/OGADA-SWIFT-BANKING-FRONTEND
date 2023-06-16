import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../constants";
import { CLIENT_ROUTES } from "../../constants/routes";
import Button from "../../components/Button";
import Slider from "react-rc-carousel";
import vector from "../../constants/images/vector";
import styled from "styled-components";
const Welcome = () => {
  return (
    <WelcomeWrapper>
      <div>
        <div className="slider-wrapper">
          <Slider
            theme={{ color: COLORS.blue, backgroundColor: COLORS.gray }}
            isShowDots={{ isOut: false }}
            isShowButtons={false}
            isAutoSlide={false}
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

const WelcomeWrapper = styled.div`
  .slide-box {
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0;

    .slide-image {
      border: 3px solid #2b2b2b27;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: center;
        object-position: center;
      }
    }

    .slide-header {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;
      text-align: center;
      color: ${COLORS.black};
      width: 242px;
    }

    .slide-description {
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      color: ${COLORS.black};
      width: 80%;
    }
  }

  .create-account-btn {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      padding: 12px;
      height: 50px;
      width: 300px;
      color: ${COLORS.white};
      border-radius: 12px;
      border: none;
      background: ${COLORS.blue};
      margin-top: 20px;
    }
  }

  .signin-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    p {
      color: ${COLORS.black};
      font-weight: 600;

      a {
        text-decoration: none;
        padding-left: 5px;
        color: ${COLORS.blue};
      }
    }
  }
`;
