import axios from "axios";
import { logout } from "../redux/actions";
import { URL } from "./utils";
import { message } from "antd";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: URL,
  timeout: 10000,
});

const handleUnauthorized = async () => {
  localStorage.removeItem("token");
  store.dispatch(logout());
};

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        handleUnauthorized();
      } else if (
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        message.error(
          error.response?.data?.message || "Oops! Something went wrong."
        );
      } else {
        message.error("Oops! Something went wrong.");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
