import axios from 'axios';
import {
  getMethod,
  authenticatedJsonHeader,
  defaultOptions,
  getLocationOrigin,
} from '../../fetchTools';
import claimApi from '../../../../server/api/claimApi';
import restApiUrls from '../../../../server/api/restApiUrls';

const listClaims = () => {
  const method = getMethod.method;
  const headers = authenticatedJsonHeader();
  const url = `${getLocationOrigin()}${claimApi.url}${restApiUrls.readUrl()}`;
  const options = { ...defaultOptions };

  return axios.request({
    method,
    url,
    withCredentials: true,
    ...headers,
    ...options,
  })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export default listClaims;
