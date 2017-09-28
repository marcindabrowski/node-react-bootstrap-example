import axios from 'axios';
import {
  patchMethod,
  authenticatedJsonHeader,
  defaultOptions,
  getLocationOrigin,
} from '../../fetchTools';
import claimApi from '../../../../server/api/claimApi';
import restApiUrls from '../../../../server/api/restApiUrls';

const updateClaim = (id, claimStatus) => {
  const method = patchMethod.method;
  const headers = authenticatedJsonHeader();
  const url = `${getLocationOrigin()}${claimApi.url}${restApiUrls.updateUrl(id)}`;
  const options = { ...defaultOptions };

  return axios.request({
    method,
    url,
    withCredentials: true,
    ...headers,
    ...options,
    data: {
      status: claimStatus,
    },
  })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export default updateClaim;
