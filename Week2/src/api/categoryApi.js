import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory: (params) => {
    const url = "api/v1/category";
    return axiosClient.get(url, params);
  },
  getThread: (value) => {
    const url = `api/v1/thread/?category=${value}`;
    // console.log(value)
    return axiosClient.get(url);
  },
};

export default categoryApi;
