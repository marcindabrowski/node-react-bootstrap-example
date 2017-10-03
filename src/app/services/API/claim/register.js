import axios from 'axios';
import validator from 'validator';
import moment from 'moment';
import { postMethod, jsonHeader, defaultOptions, getLocationOrigin } from '../../fetchTools';
import claimApi from '../../../../server/api/claimApi';
import restApiUrls from '../../../../server/api/restApiUrls';

export const claimDateFormat = 'YYYY-MM-DD';
export const claimTypes = ['Lost Baggage', 'Theft', 'Missed Flight', 'Illness', 'Accident'];

function isNullOrEmpty(value) {
  return value === undefined || value === null || value.length === 0;
}

function getDateValidationText(value) {
  const date = moment(value, claimDateFormat, true);
  if (!date.isValid()) {
    return `Provide valid date with format '${claimDateFormat}'.`;
  }
  if (moment().isBefore(date)) {
    return 'Date cannot be in the future.';
  }
  return null;
}

function validateField(fieldName, value) {
  if (isNullOrEmpty(value)) {
    return 'Field is required.';
  }
  switch (fieldName) {
    case 'name':
      break;
    case 'email':
      if (!validator.isEmail(value)) {
        return 'Provide valid email.';
      }
      break;
    case 'policyId':
      break;
    case 'type':
      if (claimTypes.indexOf(value) < 0) {
        return 'Provide valid type.';
      }
      break;
    case 'amount':
      if (!validator.isNumeric(value)) {
        return 'Provide valid amount.';
      }
      break;
    case 'date':
      return getDateValidationText(value);
    default:
      break;
  }
  return null;
}

export const isClaimFieldValid = (fieldName, value, validationResults) => {
  const validationText = validateField(fieldName, value);
  const fieldValid = validationText === null;
  const retValidationResults = validationResults;
  retValidationResults[`${fieldName}ValidationStatus`] = fieldValid ? 'success' : 'error';
  retValidationResults[`${fieldName}ValidationText`] = validationText;
  retValidationResults.isFormValid = fieldValid;
  return fieldValid;
};

export const registerClaim = (claim) => {
  const method = postMethod.method;
  const headers = jsonHeader;
  const url = `${getLocationOrigin()}${claimApi.url}${restApiUrls.createUrl()}`;
  const options = { ...defaultOptions };

  return axios
    .request({
      method,
      url,
      withCredentials: true,
      ...headers,
      ...options,
      data: claim,
    })
    .then(data => data)
    .catch(error => Promise.reject(error));
};

export const validateClaim = (claim) => {
  const validationResults = {};
  let isFormValid = true;

  isFormValid = isClaimFieldValid('name', claim.name, validationResults) && isFormValid;
  isFormValid = isClaimFieldValid('email', claim.email, validationResults) && isFormValid;
  isFormValid = isClaimFieldValid('policyId', claim.policyId, validationResults) && isFormValid;
  isFormValid = isClaimFieldValid('type', claim.type, validationResults) && isFormValid;
  isFormValid = isClaimFieldValid('amount', claim.amount, validationResults) && isFormValid;
  isFormValid = isClaimFieldValid('date', claim.date, validationResults) && isFormValid;

  validationResults.isFormValid = isFormValid;

  return validationResults;
};
