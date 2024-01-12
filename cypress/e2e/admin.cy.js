import {
  addUserFromAdmin,
  deleteUserFromAdmin,
  verifyUserDetails,
} from '../support/admin.cmd';
import { addEmployee, deleteEmployee } from '../support/pim.cmd';

describe('Admin', () => {
  beforeEach(() => {
    cy.login();
    addEmployee();
    cy.visit('admin/viewSystemUsers');
    cy.wait(2000);
    cy.assertPageHeader('Admin');
  });

  afterEach(() => {
    cy.visit('admin/viewSystemUsers');
    deleteUserFromAdmin('Mon Test');
    deleteEmployee();
  });

  it('can add user', () => {
    cy.fixture('admin').then((admin) => {
      const newUser = admin.testUser;
      addUserFromAdmin(newUser);
      cy.contains(newUser.username).should('be.visible');
    });
  });

  it.only('saves the correct user information', () => {
    cy.fixture('admin').then((admin) => {
      const newUser = admin.testUser;
      addUserFromAdmin(newUser);
      cy.contains(newUser.username).should('be.visible');
      verifyUserDetails(newUser.username);
    });
  });
});
