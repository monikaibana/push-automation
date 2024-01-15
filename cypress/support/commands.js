import login from '../selectors/login.css';

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.visit('auth/login');
    cy.get(login.usernameField).type(username);
    cy.get(login.passwordField).type(password);
    cy.get(login.loginButton).click();
  }
);
