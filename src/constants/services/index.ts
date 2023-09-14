const BASE_URL = "http://ec2-34-245-147-71.eu-west-1.compute.amazonaws.com/api/v1";

const QUERY_KEYS = {
  currentUser: "currentUser",
  currentUserAccounts: "currentUserAccounts",
};

const ENDPOINTS = {
  currentUser: "/users/me",
  currentUserAccounts: "/users/me/accounts",
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  signUp: "/auth/signup",
  sendEmail: "/auth/send-email-verification",
  verifyEmail: "/auth/confirm-email-verification",
  forgetPasscode: "/auth/forgot-login-passcode",
  resetLoginPasscode: "/auth/reset-login-passcode",
  transactionAll: "/transactions/all",
  transaction: "/transactions/banks/1",
};

const TEST_NETWORK_SUCCESS_INFO = {
  signUp: "TEST: User signed up successfully",
  sendEmail: "TEST: Email sent successfully",
};

export { QUERY_KEYS, ENDPOINTS, BASE_URL, TEST_NETWORK_SUCCESS_INFO };
