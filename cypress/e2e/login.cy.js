import login from '../selectors/login.css';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('auth/login');
  });

  it('can log in', () => {
    cy.get(login.usernameField).type(Cypress.env('username'));
    cy.get(login.passwordField).type(Cypress.env('password'));
    cy.get(login.loginButton).click();

    // assert the user is redirected to the correct page
    cy.assertPageHeader('Dashboard');
  });
});
