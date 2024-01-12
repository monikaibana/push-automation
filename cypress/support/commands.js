import login from '../selectors/login.css';
import header from '../selectors/header.css';

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.session(
      [username, password],
      () => {
        cy.visit('auth/login');
        cy.get(login.usernameField).type(username);
        cy.get(login.passwordField).type(password);
        cy.get(login.loginButton).click();
      },
      { cacheAcrossSpecs: true }
    );
  }
);

Cypress.Commands.add('assertPageHeader', (headerTitle) => {
  cy.get(header.title).should('be.visible').and('contain', headerTitle);
});
