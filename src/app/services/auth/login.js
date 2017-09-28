import axios from 'axios';
import {
  postMethod,
  jsonHeader,
  defaultOptions,
  getLocationOrigin,
} from '../fetchTools';

const authLogin = (
  email, password,
) => {
  const method = postMethod.method;
  const headers = jsonHeader;
  const url = `${getLocationOrigin()}/auth/login`;
  const options = { ...defaultOptions };

  return axios.request({
    method,
    url,
    withCredentials: true,
    ...headers,
    ...options,
    data: {
      email,
      password,
    },
  })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export default authLogin;
