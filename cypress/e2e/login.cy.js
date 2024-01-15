import LoginPage from '../support/pages/LoginPage';
import DashboardPage from '../support/pages/dashboardPage';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('auth/login');
  });

  it('can log in', () => {
    LoginPage.enterUsername();
    LoginPage.enterPassword();
    LoginPage.clickLoginButton();
    DashboardPage.validateHeader('Dashboard');
  });
});
