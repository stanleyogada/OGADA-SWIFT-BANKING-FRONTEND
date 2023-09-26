const env = (() => {
  const dev = {
    BASE_URL: "http://localhost:8000",
    currentUserAccounts: "/users/me.accounts",
    sendMoneyInHouse: "/transactions/send.in-house",
    getUserByPhone: "/user-by-phone",
  };

  const prod = {
    BASE_URL: "https://opay-demo-backend-production.up.railway.app/api/v1",
    currentUserAccounts: "/users/me/accounts",
    sendMoneyInHouse: "/transactions/in-houses/send-money",
    getUserByPhone: "/users/by-phone",
  };

  if (["development", "test"].includes(process.env.NODE_ENV as string)) return dev;

  return prod;
})();

const BASE_URL = env.BASE_URL;

const QUERY_KEYS = {
  currentUser: "currentUser",
  currentUserAccounts: "currentUserAccounts",
  defaultUserLoginInfo: "defaultUserLoginInfo",
  getUserByPhone: "getUserByPhone",
};

const ENDPOINTS = {
  defaultUserLoginInfo: "/users/default-user-login",
  currentUser: "/users/me", // (++ has fake data)
  currentUserAccounts: env.currentUserAccounts, // (++ has fake data)
  signIn: "/auth/signin", // (++ has fake data)
  signOut: "/auth/signout",
  signUp: "/auth/signup",
  sendEmail: "/auth/send-email-verification",
  verifyEmail: "/auth/confirm-email-verification",
  forgetPasscode: "/auth/forgot-login-passcode",
  resetLoginPasscode: "/auth/reset-login-passcode",
  transactions: "/transactions/all", // (++ has fake data)
  sendMoneyInHouse: env.sendMoneyInHouse, // (++ has fake data)
  getUserByPhone: env.getUserByPhone, // (++ has fake data)
};

const TEST_NETWORK_SUCCESS_INFO = {
  signUp: "TEST: User signed up successfully",
  sendEmail: "TEST: Email sent successfully",
};

export { QUERY_KEYS, ENDPOINTS, BASE_URL, TEST_NETWORK_SUCCESS_INFO };
