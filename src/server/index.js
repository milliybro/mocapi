import axios from "axios";

const request = axios.create({
  baseURL: "https://65256f4e67cfb1e59ce74796.mockapi.io/api/v3/",
  timeout: 10000,
});

export default request;
