# OrangeHRM E2E Automation Testing

An automation test suite that uses the Cypress framework to test the [OrangeHRM demo website](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login). 
This framework covers the basic functionalities of the demo web app:
- User creation
- Created user details verification
- Project time report verification

## Setup
1. Clone the repo: `git clone https://github.com/monikaibana/push-automation.git`
2. Change directory: `cd push-automation`
3. Install dependencies `npm i`
4. Create a `cypress.env.json` file in the root directory that contains a valid username and password

## Test Execution
- Open Cypress test runner: `npm run cypress:open`
- Run Cypress headless chrome: `npm run cypress:run:chrome`

## Project Features

### Cypress Folder Structure
This project follows the suggested Cypress folder structure to organize tests and configuration.
- `cypress`  : the root directory
- `cypress/e2e`: contains test files for Cypress to automatically detect and execute
- `cypress/fixtures`: contains test data in the form of JSON files for the test scripts to use
- `cypress/selectors`: contains CSS selectors to use when exectuting tests
- `cypress/support`: contains supports files such as custom commands

### Data Driven Testing
Through the use of Cypress fixtures, this project allows for Data Driven Testing. The test data is separated from the test scripts
and stored in the fixtures directory. This allows for the same test to be executed with different data.

Example: *Can add user with Admin role* and *Can add user with ESS role* are the same test with different test data sets. (See `admin.cy.js`)

### Page Object Model
The project follows the Page Object Model (POM) design to aid in readability, maintainability and organization of tests. POM is the concept of 
using classes to store page elements that are imported into the test scripts.

The page objects are in the `cypress/support/pages` directory.

### Reporting
The project uses the Cypress Mochawesome Reporter to generate html reports with screenshots upon failure.
To execute tests and generate report, use command `npm run cypress:run:report`

### Future Improvements
See [documentation/future-improvements.md](https://github.com/monikaibana/push-automation/blob/documentation/future-improvements.md)
