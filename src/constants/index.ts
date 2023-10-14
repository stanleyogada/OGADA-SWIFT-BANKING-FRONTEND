import gloLogo from "@assets/mobile/glo.png";
import airtelLogo from "@assets/mobile/airtel.png";
import mtnLogo from "@assets/mobile/mtn.png";
import nineMobileLogo from "@assets/mobile/9mobile.png";

import { COLORS } from "./colors";
import { CLIENT_ROUTES } from "./routes";
import { TSendMoneyMobileNetwork, TSendMoneyMobileBundle } from "@customTypes/SendMoneyMobileNetwork";

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

const SEND_MONEY_MOBILE_NETWORKS: TSendMoneyMobileNetwork[] = [
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

const SEND_MONEY_MOBILE_BUNDLES: TSendMoneyMobileBundle[] = [
  {
    amount: 50,
    data: "50MB",
    validity: "1 day",
  },
  {
    amount: 200,
    data: "350MB",
    validity: "2 days",
  },
  {
    amount: 500,
    data: "1.8GB",
    validity: "14 days",
  },
  {
    amount: 1000,
    data: "3.9GB",
    validity: "30 days",
  },
  {
    amount: 2000,
    data: "8GB",
    validity: "30 days",
  },
  {
    amount: 3000,
    data: "11GB",
    validity: "30 days",
  },
  {
    amount: 15000,
    data: "150GB",
    validity: "30 days",
    tag: "Special",
  },
  {
    amount: 25000,
    data: "180GB",
    validity: "60 days",
    tag: "Special",
  },
  {
    amount: 50000,
    data: "450GB",
    validity: "60 days",
    tag: "Mega",
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
  SEND_MONEY_MOBILE_BUNDLES,
};
