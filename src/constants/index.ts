import gloLogo from "@assets/mobile/glo.png";
import airtelLogo from "@assets/mobile/airtel.png";
import mtnLogo from "@assets/mobile/mtn.png";
import nineMobileLogo from "@assets/mobile/9mobile.png";

import { COLORS } from "./colors";
import { CLIENT_ROUTES } from "./routes";

const LOCAL_STORAGE_KEYS = {
  token: "token",
  sendEmailCodeSuccess: "signup-success",
  sendForgetPasscodeOTPSuccess: "forget-passcode-otp-success",
  saveBeneficiary: "save-beneficiary",
};

const DEFAULT_USER_AVATAR =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.2.1995508173.1693448090&semt=sph";
const DEFAULT_BANK_LOGO = "https://nigerianbanks.xyz/logo/default-image.png";

const TEST_LOG_PREFIX = "TEST LOG: ";

const SIGNIN_MODAL_URL_USER_QUERY_OPTIONS = {
  defaultUser: "default",
  noUser: "no-user",
};

const SEND_MONEY_MOBILE_NETWORKS = [
  {
    id: "glo",
    name: "Glo",
    logo: gloLogo,
  },
  {
    id: "airtel",
    name: "Airtel",
    logo: airtelLogo,
  },
  {
    id: "mtn",
    name: "MTN",
    logo: mtnLogo,
  },
  {
    id: "9mobile",
    name: "9mobile",
    logo: nineMobileLogo,
  },
];

export {
  COLORS,
  CLIENT_ROUTES,
  LOCAL_STORAGE_KEYS,
  DEFAULT_USER_AVATAR,
  TEST_LOG_PREFIX,
  SIGNIN_MODAL_URL_USER_QUERY_OPTIONS,
  DEFAULT_BANK_LOGO,
  SEND_MONEY_MOBILE_NETWORKS,
};
