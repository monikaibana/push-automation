const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth',
    video: false,
    screenshotOnRunFailure: false,
    testIsolation: true,
  },
});
