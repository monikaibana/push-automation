export function verifyTimeReport(dateFrom, dateTo, activity, time) {
  cy.get('li').contains('Reports').click();
  cy.get('[role=menuitem]').contains('Project Reports').click();
  enterAutocomplete();
  enterDate('From', dateFrom);
  enterDate('To', dateTo);
  cy.get('button[type=submit]').click();

  cy.get('.rgRow').each(($el, index) => {
    if (index >= 0) {
      cy.wrap($el).find('.cell-action').should('contain', activity[index]);
      cy.wrap($el).find('.col-alt').should('contain', time[index]);
    }
  });
}

function enterAutocomplete() {
  cy.get('label')
    .contains('Project Name')
    .parent()
    .parent()
    .find('input')
    .type('Apache')
    .wait(2000) // short wait for the autocomplete field api
    .type('{downArrow} {enter}');
}

function enterDate(input, date) {
  cy.get(`[placeholder="${input}"]`).type(date);
}
