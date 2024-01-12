/* 
Functions used in the time test script. 
*/

export function verifyTimeReport(data, activity, time) {
  navToReportsPage();
  navToProjectReportsTab();
  enterProjectNameAutocomplete(data.projectName);
  enterDate('From', data.dateFrom);
  enterDate('To', data.dateTo);
  clickViewButton();
  assertActivities(activity, time);
}

/* 
The functions below are helper functions. 
*/

function navToReportsPage() {
  cy.get('li').contains('Reports').click();
}

function navToProjectReportsTab() {
  cy.get('[role=menuitem]').contains('Project Reports').click();
}

function clickViewButton() {
  cy.get('button[type=submit]').click();
}

function enterProjectNameAutocomplete(projectName) {
  const projectNameInput = projectName.split(' ')[0]; // typing the entire project name returns no results
  cy.get('label')
    .contains('Project Name')
    .parent()
    .parent()
    .find('input')
    .type(projectNameInput)
    .wait(2000) // short wait for the autocomplete field api
    .type('{downArrow} {enter}'); // selects the first result
}

function enterDate(dateFieldLabel, dateInput) {
  cy.get(`[placeholder="${dateFieldLabel}"]`).type(dateInput);
}

function assertActivities(activity, time) {
  cy.get('.rgRow').each(($el, index) => {
    if (index >= 0) {
      cy.wrap($el).find('.cell-action').should('contain', activity[index]);
      cy.wrap($el).find('.col-alt').should('contain', time[index]);
    }
  });
}
