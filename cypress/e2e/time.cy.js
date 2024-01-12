import { verifyTimeReport } from '../support/time.cmd';

describe('Time', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('time/viewEmployeeTimesheet');
    cy.assertPageHeader('Time');
  });

  it('can query time reports', () => {
    cy.fixture('time').then((data) => {
      let activities = data.activities.map((activity) => activity.activityName);
      let times = data.activities.map((activity) => activity.time);
      verifyTimeReport(data.dateFrom, data.dateTo, activities, times);
    });
  });
});
