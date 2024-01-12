/* 
Functions used in the admin test script. These are used to populate the db with an
employer to use when creating a new user. An improvement would be to populate the 
db with an API call rather than using the UI.
*/

export function addEmployee(testData) {
  navToPIMPage();
  clickAddButton();
  enterInput('firstName', testData.firstName);
  enterInput('lastName', testData.lastName);
  clickSubmitButton();
  cy.wait(2000);
}

export function deleteEmployee(testData) {
  navToPIMPage();
  enterAutocomplete('Employee Name', testData.firstName);
  clickSubmitButton();
  deleteUserFromTable(testData.firstName);
  clickConfirmDeleteButton();
}

/* 
The functions below are helper functions. 
*/

function navToPIMPage() {
  cy.visit('pim/viewEmployeeList');
  cy.assertPageHeader('PIM');
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
    .type(textInput)
    .wait(2000); // short wait for the autocompelte api to populate dropdown
  cy.get('[role=option]').contains(textInput).click();
}

function clickSubmitButton() {
  cy.get('button[type=submit]').click();
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
