import PimPage from '../support/pages/pimPage';
import DashboardPage from '../support/pages/dashboardPage';
import AdminPage from '../support/pages/adminPage';

describe('Admin', () => {
  context('Adding a New User', () => {
    beforeEach(() => {
      cy.login();
      cy.fixture('admin').then((admin) => {
        PimPage.addEmployee(admin.testEmployer);
      });
      DashboardPage.navigateToPage('Admin');
    });

    afterEach(() => {
      cy.visit('admin/viewSystemUsers');
      cy.fixture('admin').then((admin) => {
        AdminPage.deleteUser(admin.testEmployer);
        PimPage.deleteEmployee(admin.testEmployer);
      });
    });

    it('can add user with Admin user role', () => {
      cy.fixture('admin').then((admin) => {
        const adminUser = admin.testAdmin;
        AdminPage.addUser(adminUser);
        AdminPage.searchByEmployerName(adminUser.employeeName);
        cy.contains(adminUser.username).should('be.visible');
      });
    });

    it('can add user with ESS user role', () => {
      cy.fixture('admin').then((admin) => {
        const ESSUser = admin.testESS;
        AdminPage.addUser(ESSUser);
        AdminPage.searchByEmployerName(ESSUser.employeeName);
        cy.contains(ESSUser.username).should('be.visible');
      });
    });
  });

  context('Verifying User Details', () => {
    beforeEach(() => {
      cy.login();
      cy.fixture('admin').then((admin) => {
        PimPage.addEmployee(admin.testEmployer);
      });
      DashboardPage.navigateToPage('Admin');
    });

    afterEach(() => {
      cy.visit('admin/viewSystemUsers');
      cy.fixture('admin').then((admin) => {
        AdminPage.deleteUser(admin.testEmployer);
        PimPage.deleteEmployee(admin.testEmployer);
      });
    });

    it('displays the correct user information in user management table', () => {
      cy.fixture('admin').then((admin) => {
        const newUser = admin.testAdmin;
        AdminPage.addUser(newUser);
        AdminPage.searchByEmployerName(newUser.employeeName);
        cy.contains(newUser.username).should('be.visible');
        AdminPage.verifyUserDetails(newUser);
      });
    });
  });
});
