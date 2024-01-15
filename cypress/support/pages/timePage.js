class TimePage {
  navigateToProjectReportsTab() {
    openReportsDropdown();
    selectProjectReportsTab();
  }

  viewTimeReport(data) {
    enterProjectNameAutocomplete(data.projectName);
    enterDate('From', data.dateFrom);
    enterDate('To', data.dateTo);
    clickViewButton();
  }

  verifyTimeReport(activity, time) {
    assertActivities(activity, time);
  }
}

function openReportsDropdown() {
  cy.get('li').contains('Reports').click();
}

function selectProjectReportsTab() {
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
    .type(projectNameInput);
  cy.get('[role=option]').contains(projectName).click({ timeout: 2000 });
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

export default new TimePage();
