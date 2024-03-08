import axios from "axios";
import { URL } from "../utils/utils";

const searchAPI = async (resource, params) => {
  const token = localStorage.getItem("token");
  return axios
    .get(URL + resource, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cancelToken: params?.cancelToken,
    })
    .then((response) => response)
    .catch((error) => error);
};

export default searchAPI;
