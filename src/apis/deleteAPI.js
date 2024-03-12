import axios from "../utils/axiosConfig";
import { URL } from "../utils/utils";

const deleteAPI = async (resource, payload) => {
  return axios
    .delete(URL + resource, { data: payload })
    .then((response) => response)
    .catch((error) => error);
};

export default deleteAPI;
