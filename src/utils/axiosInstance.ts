import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  headers: {
    Authorization: "Bearer YOUR_AUTH_TOKEN", // Replace with your authorization token
    "Content-Type": "application/json", // Example header, add any other headers you need
  },
});

export { axiosInstance };
