class AdminPage {
  addUser(userData) {
    clickAddButton();
    selectFromDropdown('User Role', userData.userRole);
    enterAutocomplete('Employee Name', userData.employeeName);
    selectFromDropdown('Status', userData.status);
    enterInput('Username', userData.username);
    enterInput('Password', userData.password);
    enterInput('Confirm Password', userData.password);
    clickSubmitButton();
    waitForTableReload();
  }

  deleteUser(userData) {
    const employerName = userData.firstName + ' ' + userData.lastName;
    this.searchByEmployerName(employerName);
    deleteUserFromTable(employerName);
    clickConfirmDeleteButton();
  }

  searchByEmployerName(employeeName) {
    enterAutocomplete('Employee Name', employeeName);
    clickSubmitButton();
  }

  verifyUserDetails(userData) {
    assertUserDetails(userData.employeeName, userData.username);
    assertUserDetails(userData.employeeName, userData.userRole);
    assertUserDetails(userData.employeeName, userData.status);
  }
}

function clickAddButton() {
  cy.get('.orangehrm-header-container > .oxd-button').click();
}

function enterInput(label, text) {
  cy.get('label').contains(label).parent().parent().find('input').type(text);
}

function clickSubmitButton() {
  cy.get('button[type=submit]').click();
}

function waitForTableReload() {
  cy.get('.orangehrm-container', { timeout: 8000 }).should('be.visible'); // extend timeout to wait for page reload
}

function selectFromDropdown(fieldLabel, option) {
  cy.get('label')
    .contains(fieldLabel)
    .parent()
    .parent()
    .find('.oxd-select-text-input')
    .click();
  cy.get('[role=option]').contains('span', option).click();
}

function enterAutocomplete(fieldLabel, textInput) {
  cy.get('label')
    .contains(fieldLabel)
    .parent()
    .parent()
    .find('input')
    .type(textInput);
  cy.get('[role=option]').contains(textInput).click({ timeout: 2000 }); // extend timeout for the autocomplete api to populate
}

function deleteUserFromTable(employerName) {
  cy.get('[role=cell]')
    .contains(employerName)
    .parent()
    .parent()
    .find('.bi-trash')
    .click();
}

function clickConfirmDeleteButton() {
  cy.get('button').contains('Yes, Delete').click();
}

function assertUserDetails(employerName, detail) {
  cy.get('[role=cell]')
    .contains(employerName)
    .parent()
    .parent()
    .find('[role=cell]')
    .contains(detail)
    .should('be.visible');
}

export default new AdminPage();
