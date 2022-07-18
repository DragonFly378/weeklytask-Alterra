import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

import Cookies from "js-cookie";

// const axiosClient = axios.create({
//   baseURL: apiConfig.baseUrl,
//   headers: {
//     "content-Type": "application/json",
//   },
//   paramsSerializer: (params) => queryString.stringify({ ...params }),
// });

const token = Cookies.get("token");

const isDev = process.env.NODE_ENV === "development";

const isLocalDev = (isDev) => {
  let axiosConfig;
  axiosConfig = axios.create();
  if (isDev) {
    const config = {
      baseURL: apiConfig.baseUrl,
      headers: {
        "Content-Type": "application/json",
        ...(!!token && { Authorization: `Bearer ${token}` }),
      },
    };
    axiosConfig = axios.create(config);
  }
  return axiosConfig;
};

const axiosClient = isLocalDev(isDev);

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
