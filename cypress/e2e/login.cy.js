/// <reference types="cypress" />

import login from '../selectors/login.css';
import header from '../selectors/header.css';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('can log in', () => {
    cy.get(login.usernameField).type(Cypress.env('username'));
    cy.get(login.passwordField).type(Cypress.env('password'));

    cy.get(login.loginButton).click();

    // assert the user is redirected to the correct page
    cy.get(header.title).should('be.visible').and('contain', 'Dashboard');
  });
});
