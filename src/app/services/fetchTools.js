import { Base64 } from 'js-base64';
import jQuery from 'jquery';
import Auth from './auth/Auth';

/*
  window.location.origin polyfill
 */
export const getLocationOrigin = () => {
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${window.location.hostname}${window
      .location.port
      ? `:${window.location.port}`
      : ''}`;
  }
  return window.location.origin;
};

/*
  query options:
 */
export const getMethod = {
  method: 'get',
};

export const postMethod = {
  method: 'post',
};

export const patchMethod = {
  method: 'patch',
};

export const defaultOptions = {
  credentials: 'same-origin',
};

export const jsonHeader = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const authenticatedHeader = () => ({
  headers: {
    Authorization: `bearer ${Auth.getToken()}`,
  },
});

export const authenticatedJsonHeader = () =>
  jQuery.extend(true, {}, jsonHeader, authenticatedHeader());

/*
 general helpers
 */
export const encodeBase64 = stringToEncode => Base64.encode(stringToEncode);
