const BASE_URL = "http://ec2-54-195-154-57.eu-west-1.compute.amazonaws.com/api/v1";

const QUERY_KEYS = {
  currentUser: "currentUser",
};

const ENDPOINTS = {
  currentUser: "/users/me",
  signIn: "/auth/signin",
};

export { QUERY_KEYS, ENDPOINTS, BASE_URL };
