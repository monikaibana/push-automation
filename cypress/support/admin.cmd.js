/* 
Functions used in the admin test script. 
*/

export function addUserFromAdmin(testData) {
  clickAddButton();
  selectFromDropdown('User Role', testData.userRole);
  enterAutocomplete('Employee Name', testData.employeeName);
  selectFromDropdown('Status', testData.status);
  enterInput('Username', testData.username);
  enterInput('Password', testData.password);
  enterInput('Confirm Password', testData.password);
  clickSubmitButton();
  cy.wait(8000); // long wait to allow page to reload with new user
}

export function deleteUserFromAdmin(testData) {
  const employerName = testData.firstName + ' ' + testData.lastName;
  searchByEmployerName(employerName);
  deleteUserFromTable(employerName);
  clickConfirmDeleteButton();
}

export function searchByEmployerName(testData) {
  enterAutocomplete('Employee Name', testData);
  clickSubmitButton();
  cy.wait(2000);
}

export function verifyUserDetails(testData) {
  assertUserDetails(testData.employeeName, testData.username);
  assertUserDetails(testData.employeeName, testData.userRole);
  assertUserDetails(testData.employeeName, testData.status);
}

/* 
The functions below are helper functions. 
*/

function clickAddButton() {
  cy.get('.orangehrm-header-container > .oxd-button').click();
}

function enterInput(label, text) {
  cy.get('label').contains(label).parent().parent().find('input').type(text);
}

function clickSubmitButton() {
  cy.get('button[type=submit]').click();
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
    .type(textInput)
    .wait(2000); // short wait for the autocompelte api to populate dropdown
  cy.get('[role=option]').contains(textInput).click();
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
