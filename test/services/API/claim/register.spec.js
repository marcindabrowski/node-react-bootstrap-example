import { expect } from 'chai';
import { claimTypes, validateClaim } from '../../../../src/app/services/API/claim/register';

describe('validateClaim', () => {
  it('should require name', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('nameValidationStatus', 'error');
    expect(validationResults).to.have.own.property('nameValidationText', 'Field is required.');
  });

  it('should require email', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('emailValidationStatus', 'error');
    expect(validationResults).to.have.own.property('emailValidationText', 'Field is required.');
  });

  it('should check email validity', () => {
    const validationResults = validateClaim({ email: 'abc' });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('emailValidationStatus', 'error');
    expect(validationResults).to.have.own.property('emailValidationText', 'Provide valid email.');
  });

  it('should require policyId', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('policyIdValidationStatus', 'error');
    expect(validationResults).to.have.own.property('policyIdValidationText', 'Field is required.');
  });

  it('should require type', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('typeValidationStatus', 'error');
    expect(validationResults).to.have.own.property('typeValidationText', 'Field is required.');
  });

  it('should require valid type', () => {
    const validationResults = validateClaim({ type: 'Unsupported type' });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('typeValidationStatus', 'error');
    expect(validationResults).to.have.own.property('typeValidationText', 'Provide valid type.');
  });

  it('should require amount', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('amountValidationStatus', 'error');
    expect(validationResults).to.have.own.property('amountValidationText', 'Field is required.');
  });

  it('should check amount validity', () => {
    const validationResults = validateClaim({ amount: 'abc' });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('amountValidationStatus', 'error');
    expect(validationResults).to.have.own.property('amountValidationText', 'Provide valid amount.');
  });

  it('should require date', () => {
    const validationResults = validateClaim({});
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('dateValidationStatus', 'error');
    expect(validationResults).to.have.own.property('dateValidationText', 'Field is required.');
  });

  it('should require date in valid format', () => {
    const validationResults = validateClaim({ date: '01-01-2017' });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('dateValidationStatus', 'error');
    expect(validationResults).to.have.own.property(
      'dateValidationText',
      "Provide valid date with format 'YYYY-MM-DD'.",
    );
  });

  it('should require date not in future', () => {
    const validationResults = validateClaim({ date: '3000-01-01' });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', false);
    expect(validationResults).to.have.own.property('dateValidationStatus', 'error');
    expect(validationResults).to.have.own.property(
      'dateValidationText',
      'Date cannot be in the future.',
    );
  });

  it('should positive validate valid claim', () => {
    const validationResults = validateClaim({
      name: 'Marcin Dąbrowski',
      email: 'mda@example.org',
      policyId: '124erew',
      type: claimTypes[0],
      amount: '100',
      date: '2017-09-01',
    });
    expect(validationResults)
      .to.be.an('object')
      .to.have.own.property('isFormValid', true);
    expect(validationResults).to.have.own.property('nameValidationStatus', 'success');
    expect(validationResults).to.have.own.property('emailValidationStatus', 'success');
    expect(validationResults).to.have.own.property('policyIdValidationStatus', 'success');
    expect(validationResults).to.have.own.property('typeValidationStatus', 'success');
    expect(validationResults).to.have.own.property('amountValidationStatus', 'success');
    expect(validationResults).to.have.own.property('dateValidationStatus', 'success');
  });
});
