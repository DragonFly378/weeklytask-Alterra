import axiosClient from "./axiosClient";

const fgdApi = {
  login: (params) => {
    const url = "api/v1/auth/login";
    return axiosClient.post(url, params);
  },
  register: (params) => {
    const url = "api/v1/auth/register";
    return axiosClient.post(url, params);
  },
  getAllUser: (params) => {
    const url = "api/v1/user/";
    // console.log(params);
    return axiosClient.get(url + `?page=${params.x}`);
  },
  getUserById: (id, params) => {
    const url = `api/v1/user/${id}`;
    return axiosClient.get(url, params);
  },
  getThread: (params) => {
    const url = "api/v1/thread/";
    // console.log(params);
    return axiosClient.get(url + `?page=${params.curentPage}`);
  },
  getSearchThread: (params) => {
    const url = "api/v1/thread/search/";
    // console.log(params);
    return axiosClient.get(
      url + `?page=${params.curentPage}&title=${params.title}`
    );
  },
  getLengthThread: (params) => {
    const url = "api/v1/thread";
    // console.log(params);
    return axiosClient.get(url, params);
  },
  getThreadByUserId: (id, params) => {
    const url = `api/v1/thread/user/${id}`;
    return axiosClient.get(url, params);
  },
  getThreadById: (id, params) => {
    const url = `api/v1/thread/${id}`;
    return axiosClient.get(url, params);
  },
  likeThread: (id, token) => {
    const url = `api/v1/like/thread/${id}`;
    return axiosClient.put(url, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  saveThread: (id, token) => {
    const url = `api/v1/save/thread/${id}`;
    return axiosClient.put(url, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  postThread: (data, token) => {
    const url = "api/v1/thread";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteThread: (id, token) => {
    const url = `api/v1/thread/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    });
  },
  reportThread: (data, token) => {
    const url = "api/v1/report_thread";
    // console.log(url, data, token);
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getCategory: (params) => {
    const url = "api/v1/category/";
    return axiosClient.get(url, params);
  },
  followUser: (id, token, params) => {
    const url = `api/v1/follow/user/${id}`;
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadPhoto: (token, data) => {
    const url = `api/v1/user/photo`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadBanner: (token, data) => {
    const url = `api/v1/user/cover`;
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  editProfile: (data, token) => {
    const url = "api/v1/user";
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getCommentByIdThread: (id) => {
    const url = `api/v1/comment/thread/${id}`;
    return axiosClient.get(url);
  },
  postComment: (data, token) => {
    const url = "api/v1/comment";
    // console.log(url, data, token);
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getRanking: (params) => {
    const url = "api/v1/user/ranking";
    return axiosClient.get(url, params);
  },

  getThreadByTitle: (params, token) => {
    const url = `api/v1/thread/search?title=${params}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    });
  },
};

export default fgdApi;
