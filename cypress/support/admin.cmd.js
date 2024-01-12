export function addUserFromAdmin(testData) {
  cy.get('.orangehrm-header-container > .oxd-button').click();
  selectFromDropdown('User Role', testData.userRole);
  enterAutocomplete();
  selectFromDropdown('Status', testData.status);
  enterInput('Username', testData.username);
  enterInput('Password', testData.password);
  enterInput('Confirm Password', testData.password);
  cy.get('button[type=submit]').click();
  cy.wait(2000);
  cy.contains(testData.username).should('be.visible');
}

export function deleteUserFromAdmin(username) {
  enterInput('Username', username);
  cy.get('button[type=submit]').click();
  selectUserFromTable(username);
  cy.get('button').contains('Yes, Delete').click();
}

export function verifyUserDetails(username) {
  enterInput('Username', username);
  cy.get('button[type=submit]').click();
  assertUserDetails(username, 'Admin');
  assertUserDetails(username, 'Monika Test');
  assertUserDetails(username, 'Enabled');
}

function enterInput(label, text) {
  cy.get('label').contains(label).parent().parent().find('input').type(text);
}

function selectFromDropdown(label, option) {
  cy.get('label')
    .contains(label)
    .parent()
    .parent()
    .find('.oxd-select-text-input')
    .click();
  cy.get('[role=option]').contains('span', option).click();
}

function enterAutocomplete() {
  cy.get('label')
    .contains('Employee Name')
    .parent()
    .parent()
    .find('input')
    .type('Monika')
    .wait(2000) // short wait for the autocomplete field api
    .type('{downArrow} {enter}');
}

function selectUserFromTable(username) {
  cy.get('[role=cell]')
    .contains(username)
    .parent()
    .parent()
    .find('.bi-trash')
    .click();
}

function assertUserDetails(username, detail) {
  cy.get('[role=cell]')
    .contains('Mon Test')
    .parent()
    .parent()
    .find('[role=cell]')
    .contains('Admin')
    .should('be.visible');
}
