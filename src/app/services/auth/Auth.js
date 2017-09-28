import jwt from 'jsonwebtoken';
import moment from 'moment';

const tokenName = 'token';

class Auth {
  static authenticateUser(token) {
    localStorage.setItem(tokenName, token);
  }

  static isUserAuthenticated() {
    return Auth.getToken() !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem(tokenName);
  }

  static getToken() {
    return localStorage.getItem(tokenName);
  }

  static getTokenExpirationDate() {
    const encodedToken = Auth.getToken();
    if (!encodedToken) {
      return new Date(0); // is expired
    }

    const token = jwt.decode(encodedToken);
    if (!token.exp) {
      return new Date(0); // is expired
    }

    return new Date(token.exp * 1000);
  }

  static isTokenExpired() {
    const expirationDate = Auth.getTokenExpirationDate();
    const rightNow = moment();
    return moment(rightNow).isAfter(moment(expirationDate));
  }
}

export default Auth;
