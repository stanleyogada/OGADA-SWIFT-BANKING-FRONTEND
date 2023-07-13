import axios from "axios";
import { BASE_URL } from "../constants/services";

// get token from cookies
// let token = "";
// document.cookie.split(";").forEach((cookie) => {
//   if (cookie.includes("token")) {
//     token = cookie.split("=")[1];
//   }
// }); // TODO: uncomment this after fixing cookie issue on the backend

const token = localStorage.getItem("token") || ""; // TODO: remove this after fixing cookie issue on the backend

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
