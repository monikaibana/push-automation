import login from '../../selectors/login.css';

class LoginPage {
  enterUsername(username = Cypress.env('username')) {
    cy.get(login.usernameField).type(username);
  }

  enterPassword(password = Cypress.env('password')) {
    cy.get(login.passwordField).type(password);
  }

  clickLoginButton() {
    cy.get(login.loginButton).click();
  }
}

export default new LoginPage();
