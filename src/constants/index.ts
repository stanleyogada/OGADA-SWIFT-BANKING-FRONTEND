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

const TEST_LOG_PREFIX = "TEST LOG: ";

const SIGNIN_MODAL_URL_USER_QUERY_OPTIONS = {
  defaultUser: "default",
  noUser: "no-user",
};

export {
  COLORS,
  CLIENT_ROUTES,
  LOCAL_STORAGE_KEYS,
  DEFAULT_USER_AVATAR,
  TEST_LOG_PREFIX,
  SIGNIN_MODAL_URL_USER_QUERY_OPTIONS,
};
