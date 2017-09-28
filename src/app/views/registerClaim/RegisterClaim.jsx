import React, {
  PureComponent,
} from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, InputGroup, HelpBlock, Glyphicon, Modal } from 'react-bootstrap';
import Datetime from 'react-datetime';
import jQuery from 'jquery';
import moment from 'moment';
import { claimDateFormat, isClaimFieldValid, validateClaim, registerClaim } from '../../services/index';

class RegisterClaim extends PureComponent {
  static getEmptyClaim() {
    return {
      name: '',
      email: '',
      policyId: '',
      type: 'Lost Baggage',
      amount: '',
      date: '',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      claim: RegisterClaim.getEmptyClaim(),
      validationResults: {},
      showModal: false,
      registrationInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.register = this.register.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal(info, claim, validationResults) {
    this.setState({ showModal: true, registrationInfo: info, claim, validationResults });
  }

  handleChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    this.validateClaimField(fieldName, value);
  }

  handleDateChange(value) {
    const dateValue = value instanceof moment ? value.format(claimDateFormat) : value;
    this.validateClaimField('date', dateValue);
  }

  validateClaimField(fieldName, value) {
    const claim = jQuery.extend({}, this.state.claim);
    const validationResults = jQuery.extend({}, this.state.validationResults);
    const fieldValidationResults = {};

    isClaimFieldValid(fieldName, value, fieldValidationResults);
    claim[fieldName] = value;
    validationResults[`${fieldName}ValidationStatus`] = fieldValidationResults[`${fieldName}ValidationStatus`];
    validationResults[`${fieldName}ValidationText`] = fieldValidationResults[`${fieldName}ValidationText`];

    this.setState({
      claim,
      validationResults,
    });
  }

  isFormValid() {
    const validationResults = validateClaim(this.state.claim);
    this.setState({
      validationResults,
    });

    return validationResults.isFormValid;
  }

  register() {
    if (!this.isFormValid()) {
      return;
    }

    const claim = this.state.claim;
    claim.amount = Number(claim.amount);
    registerClaim(claim)
      .then(() => this.openModal('Claim has been registered.', RegisterClaim.getEmptyClaim(), {}))
      .catch(error => this.openModal(`Claim hasn't been registered.
        ${error}`, claim, {}));
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registration info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.registrationInfo}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>OK</Button>
          </Modal.Footer>
        </Modal>
        <Form horizontal>
          <FormGroup controlId="formHorizontalName" validationState={this.state.validationResults.nameValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Name
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Jane Doe"
                name={'name'}
                onChange={this.handleChange}
                value={this.state.claim.name}
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.nameValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail" validationState={this.state.validationResults.emailValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl
                  type="email"
                  placeholder="jane.doe@example.com"
                  name={'email'}
                  onChange={this.handleChange}
                  value={this.state.claim.email}
                />
              </InputGroup>
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.emailValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPolicyID" validationState={this.state.validationResults.policyIdValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Policy ID
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="ABC 1234"
                name={'policyId'}
                onChange={this.handleChange}
                value={this.state.claim.policyId}
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.policyIdValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalClaimType" validationState={this.state.validationResults.typeValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Claim Type
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                placeholder="Claim Type"
                name={'type'}
                onChange={this.handleChange}
                value={this.state.claim.type}
              >
                <option value="Lost Baggage">Lost Baggage</option>
                <option value="Theft">Theft</option>
                <option value="Missed Flight">Missed Flight</option>
                <option value="Illness">Illness</option>
                <option value="Accident">Accident</option>
              </FormControl>
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.typeValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalAmount" validationState={this.state.validationResults.amountValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Claim Amount
            </Col>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="1"
                  name={'amount'}
                  onChange={this.handleChange}
                  value={this.state.claim.amount}
                />
              </InputGroup>
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.amountValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalDate" validationState={this.state.validationResults.dateValidationStatus}>
            <Col componentClass={ControlLabel} sm={2}>
              Date Occurred
            </Col>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Addon><Glyphicon glyph="calendar" /></InputGroup.Addon>
                <Datetime
                  inputProps={{
                    placeholder: 'Date Occurred',
                    name: 'date',
                  }}
                  dateFormat={claimDateFormat}
                  utc
                  timeFormat={false}
                  closeOnSelect
                  onChange={this.handleDateChange}
                  value={this.state.claim.date}
                />
              </InputGroup>
              <FormControl.Feedback />
              <HelpBlock>{this.state.validationResults.dateValidationText}</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={this.register}>
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default RegisterClaim;
