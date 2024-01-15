class PimPage {
  addEmployee(employeeData) {
    navigateToPimPage();
    clickAddButton();
    enterInput('firstName', employeeData.firstName);
    enterInput('lastName', employeeData.lastName);
    clickSubmitButton();
    waitForTableReload();
  }

  deleteEmployee(employeeData) {
    navigateToPimPage();
    enterAutocomplete('Employee Name', employeeData.firstName);
    clickSubmitButton();
    deleteUserFromTable(employeeData.firstName);
    clickConfirmDeleteButton();
  }
}

function navigateToPimPage() {
  cy.visit('pim/viewEmployeeList');
  cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    .should('be.visible')
    .and('contain', 'PIM');
}

function clickAddButton() {
  cy.get('.orangehrm-header-container > .oxd-button').click();
}

function enterInput(label, text) {
  cy.get(`[name=${label}]`).type(text);
}

function enterAutocomplete(fieldLabel, textInput) {
  cy.get('label')
    .contains(fieldLabel)
    .parent()
    .parent()
    .find('input')
    .type(textInput);
  cy.get('[role=option]', { timeout: 2000 }).contains(textInput).click();
}

function clickSubmitButton() {
  cy.get('button[type=submit]').click();
}

function waitForTableReload() {
  cy.get('.orangehrm-container', { timeout: 8000 }).should('be.visible'); // extend timeout to wait for page reload
}

function deleteUserFromTable(testData) {
  cy.get('[role=cell]')
    .contains(testData)
    .parent()
    .parent()
    .find('.bi-trash')
    .click();
}

function clickConfirmDeleteButton() {
  cy.get('button').contains('Yes, Delete').click();
}

export default new PimPage();
