import { addEmployee, deleteEmployee } from '../support/pim.cmd';
import {
  addUserFromAdmin,
  deleteUserFromAdmin,
  searchByEmployerName,
  verifyUserDetails,
} from '../support/admin.cmd';

describe('Admin', () => {
  context('Adding a New User', () => {
    beforeEach(() => {
      cy.login();
      cy.fixture('admin').then((admin) => {
        addEmployee(admin.testEmployer);
      });
      cy.visit('admin/viewSystemUsers');
      cy.wait(2000);
      cy.assertPageHeader('Admin');
    });

    afterEach(() => {
      cy.visit('admin/viewSystemUsers');
      cy.fixture('admin').then((admin) => {
        deleteUserFromAdmin(admin.testEmployer);
        deleteEmployee(admin.testEmployer);
      });
    });

    it('can add user with Admin user role', () => {
      cy.fixture('admin').then((admin) => {
        const adminUser = admin.testAdmin;
        addUserFromAdmin(adminUser);
        searchByEmployerName(adminUser.employeeName);
        cy.contains(adminUser.username).should('be.visible');
      });
    });

    it('can add user with ESS user role', () => {
      cy.fixture('admin').then((admin) => {
        const ESSUser = admin.testESS;
        addUserFromAdmin(ESSUser);
        searchByEmployerName(ESSUser.employeeName);
        cy.contains(ESSUser.username).should('be.visible');
      });
    });
  });

  context('Verifying User Details', () => {
    beforeEach(() => {
      cy.login();
      cy.fixture('admin').then((admin) => {
        addEmployee(admin.testEmployer);
      });
      cy.visit('admin/viewSystemUsers');
      cy.wait(2000);
      cy.assertPageHeader('Admin');
    });

    afterEach(() => {
      cy.visit('admin/viewSystemUsers');
      cy.fixture('admin').then((admin) => {
        deleteUserFromAdmin(admin.testEmployer);
        deleteEmployee(admin.testEmployer);
      });
    });

    it('displays the correct user information in user management table', () => {
      cy.fixture('admin').then((admin) => {
        const newUser = admin.testAdmin;
        addUserFromAdmin(newUser);
        searchByEmployerName(newUser.employeeName);
        cy.contains(newUser.username).should('be.visible');
        verifyUserDetails(newUser);
      });
    });
  });
});
