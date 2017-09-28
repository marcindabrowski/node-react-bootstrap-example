import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Row, HelpBlock } from 'react-bootstrap';

import Auth from '../../services/auth/Auth';
import authLogin from '../../services/auth/login';

class Login extends PureComponent {
  static disconnectUser() {
    Auth.deauthenticateUser();
  }

  static isNullOrEmpty(value) {
    return value === undefined || value === null || value.length === 0;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validationResults: {},
    };
    this.handlesOnEmailChange = this.handlesOnEmailChange.bind(this);
    this.handlesOnPasswordChange = this.handlesOnPasswordChange.bind(this);
    this.handlesOnLogin = this.handlesOnLogin.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    Login.disconnectUser(); // diconnect user: remove token and user info
  }


  goHome(event) {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/' });
  }

  handlesOnEmailChange(event) {
    event.preventDefault();
    this.setState({ email: event.target.value.trim() });
  }

  handlesOnPasswordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value.trim() });
  }

  isFormValid(email, password) {
    const validationResults = { isFormValid: true };
    if (Login.isNullOrEmpty(email)) {
      validationResults.emailValidationStatus = 'error';
      validationResults.emailValidationText = 'Email is required.';
      validationResults.isFormValid = false;
    } else {
      validationResults.emailValidationStatus = 'success';
    }
    if (Login.isNullOrEmpty(password)) {
      validationResults.passwordValidationStatus = 'error';
      validationResults.passwordValidationText = 'Password is required.';
      validationResults.isFormValid = false;
    } else {
      validationResults.passwordValidationStatus = 'success';
    }
    this.setState({ validationResults });
    return validationResults.isFormValid;
  }

  handlesOnLogin(event) {
    if (event) {
      event.preventDefault();
    }

    const { history } = this.props;

    const {
      email,
      password,
    } = this.state;

    if (!this.isFormValid(email, password)) {
      return;
    }

    authLogin(email, password)
      .then(data => data.data)
      .then((data) => {
        Auth.authenticateUser(data.token);
        history.push({ pathname: '/' }); // back to Home
      })
      .catch((error) => {
        console.log('login went wrong..., error: ', error); // eslint-disable-line no-console
        this.setState({ validationResults: { passwordValidationText: 'Incorrect email or password.' } });
      });
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col
            md={4}
            mdOffset={4}
            xs={10}
            xsOffset={1}
          >
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail" validationState={this.state.validationResults.emailValidationStatus}>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="jane.doe@example.com"
                    name={'email'}
                    onChange={this.handlesOnEmailChange}
                    value={this.state.email}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.validationResults.emailValidationText}</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword" validationState={this.state.validationResults.passwordValidationStatus}>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name={'password'}
                    onChange={this.handlesOnPasswordChange}
                    value={this.state.password}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.validationResults.passwordValidationText}</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col lg={10} lgOffset={2}>
                  <Button
                    className="login-button btn-block"
                    bsStyle="primary"
                    onClick={this.handlesOnLogin}
                  >
                    <span>
                            Login
                    </span>
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col
            md={4}
            mdOffset={4}
            xs={10}
            xsOffset={1}
          >
            <Button
              bsStyle="primary"
              onClick={this.goHome}
            >
              Back to home
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  // react-router 4:
  history: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Login;
