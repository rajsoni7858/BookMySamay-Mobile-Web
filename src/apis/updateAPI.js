import axios from "../utils/axiosConfig";
import { URL } from "../utils/utils";

const updateAPI = async (resource, params) => {
  return axios
    .put(URL + resource, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((error) => error);
};

export default updateAPI;
