import axios from '../utils/axiosConfig';
import {URL} from '../utils/utils';

const saveAPI = async (resource, params) => {
  return axios
    .post(URL + resource, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response)
    .catch(error => error);
};

export default saveAPI;
