import axios from "axios";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "http://localhost:4000/",
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});
