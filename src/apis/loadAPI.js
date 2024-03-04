import axios from '../utils/axiosConfig';
import {URL} from '../utils/utils';

const loadAPI = async (resource, params) => {
  return axios
    .get(URL + resource, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response)
    .catch(error => error);
};

export default loadAPI;
