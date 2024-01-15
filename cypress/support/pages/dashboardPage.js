import dashboard from '../../selectors/dashboard.css';

class DashboardPage {
  validateHeader(header) {
    cy.get(dashboard.header).should('be.visible').and('contain', header);
  }

  navigateToPage(page) {
    cy.get(dashboard.menuOption, { timeout: 2000 }).contains(page).click();
    this.validateHeader(page);
  }
}

export default new DashboardPage();
