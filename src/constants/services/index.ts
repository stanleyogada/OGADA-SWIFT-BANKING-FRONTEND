const env = (() => {
  const dev = {
    BASE_URL: "http://localhost:8000",
    currentUserAccounts: "/users/me.accounts",
  };

  const prod = {
    BASE_URL: "https://opay-demo-backend-production.up.railway.app/api/v1",
    currentUserAccounts: "/users/me/accounts",
  };

  if (process.env.NODE_ENV === "development") return dev;

  return prod;
})();

const BASE_URL = env.BASE_URL;

const QUERY_KEYS = {
  currentUser: "currentUser",
  currentUserAccounts: "currentUserAccounts",
  defaultUserLoginInfo: "defaultUserLoginInfo",
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
  transactions: "/transactions/all",
  updateUser: "/users", // (++ has fake data)
};

const TEST_NETWORK_SUCCESS_INFO = {
  signUp: "TEST: User signed up successfully",
  sendEmail: "TEST: Email sent successfully",
};

export { QUERY_KEYS, ENDPOINTS, BASE_URL, TEST_NETWORK_SUCCESS_INFO };
