import axios from "axios";

// get token from cookies
let token = "";
document.cookie.split(";").forEach((cookie) => {
  if (cookie.includes("token")) {
    token = cookie.split("=")[1];
  }
});

const axiosInstance = axios.create({
  baseURL: "http://ec2-54-195-154-57.eu-west-1.compute.amazonaws.com/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
