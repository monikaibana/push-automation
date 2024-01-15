import DashboardPage from '../support/pages/dashboardPage';
import TimePage from '../support/pages/timePage';

describe('Time', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.navigateToPage('Time');
  });

  it.only('can query time reports', () => {
    TimePage.navigateToProjectReportsTab();
    cy.fixture('time').then((data) => {
      let activities = data.activities.map((activity) => activity.activityName);
      let times = data.activities.map((activity) => activity.time);
      TimePage.viewTimeReport(data);
      TimePage.verifyTimeReport(activities, times);
    });
  });
});
