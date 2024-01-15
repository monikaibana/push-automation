const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  screenshotsFolder: 'cypress/reports/mochawesome-report/assets',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'OrangeHRM_E2E_Testing',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    video: false,
    screenshotOnRunFailure: true,
    testIsolation: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
