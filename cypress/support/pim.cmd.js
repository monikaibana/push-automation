export function addEmployee() {
  cy.visit('pim/viewEmployeeList');
  cy.assertPageHeader('PIM');
  cy.get('.orangehrm-header-container > .oxd-button').click();
  enterInput('firstName', 'Monika');
  enterInput('lastName', 'Test');
  cy.get('button[type=submit]').click();
  cy.wait(2000);
}

export function deleteEmployee() {
  cy.visit('pim/viewEmployeeList');
  enterAutocomplete();
  cy.get('button[type=submit]').click();
  selectUserFromTable();
  cy.get('button').contains('Yes, Delete').click();
}

function enterInput(label, text) {
  cy.get(`[name=${label}]`).type(text);
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

function selectUserFromTable() {
  cy.get('[role=cell]')
    .contains('Monika')
    .parent()
    .parent()
    .find('.bi-trash')
    .click();
}
