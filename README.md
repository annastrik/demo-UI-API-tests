# WebDriverIO UI and API tests in Mocha and Cucumber BDD frameworks

This is a demonstration project containing both UI and API tests. The goal is to demonstrate how to use different tools and techniques to develop automation tests.
It uses the chromedriver NPM package that wraps the ChromeDriver to communicate with the browser directly.
These tests are developed in JavaScript with [WebDriverIO](http://webdriver.io/) test automation framework. For demonstration purposes, there are separate [Mocha](https://mochajs.org/) framework's tests and [Cucumber](https://cucumber.io/) BDD framework's tests. 
[Axios](https://www.npmjs.com/package/axios) library is used to invoke the API. [Allure](http://allure.qatools.ru/) reporter is used to generate the reports.

## Features

-   JavaScript
-   [WebDriverIO](http://webdriver.io/)
-   [Mocha framework](https://mochajs.org/)
-   [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference/)
-   [Chai](https://www.chaijs.com/api/bdd/) assertion library - expect assertion style
-   Page Object Pattern
-   [Axios](https://www.npmjs.com/package/axios) http library to fetch data from API
-   [Allure reporter](http://allure.qatools.ru/)
-   [ESlint](https://eslint.org/) code analysis tool
-   [Github](https://github.com/annastrik/demo-UI-API-tests-in-Mocha-and-Cucumber.git) connection

## Getting Started

-   Clone the git repo:
```bash
git clone https://github.com/annastrik/demo-UI-API-tests-in-Mocha-and-Cucumber.git
```
-   Node.js: install from the [website](https://nodejs.org/en/download/)
-   Install npm packages: WebdriverIO, Babel, Chai, Axios, Eslint, Cucumber, Allure-reporter; or run the below command to install all dependencies at once:
```bash
npm install
```
## Configurations

WebdriverIO uses configuration files to setup and execute tests in specific ways. The configuration is fully customizable, and different functions can be invoked before, during and after each test or test suite. 
Configuration file that WDIO uses by default is `wdio.conf.js`. Information about browsers, frameworks, test scripts, reporters, after and before hooks and many more is located there.

WebdriverIO allows to setup multiple configurations for specific environments. Since there are tests built in both Mocha and Cucumber frameworks in this project, a specific configuration file for Cucumber tests has been created: `wdio.cucumber.conf.js`. Thus all general configurations are set in `wdio.conf.js` file acting as default values and Cucumber-specific values are set in `wdio.cucumber.conf.js` file and overwrite the values in general config file when Cucumber tests are run.

Also the `afterTest/afterStep` hook to save the screenshots after each test has been added to this project and configured in `wdio.conf.js` and `wdio.cucumber.conf.js` files. The screenshots can be located in the following directory: `./reports/screenshots/*`.


## Layout

All scripts for tests built in Mocha framework are located in `./tests/specs/**/*` directory.

All selectors and methods are located in `./tests/_pages/**/*` directory.

All global variables and helper functions are located in `./tests/_data/**/*` directory.

All scenarios for tests built in Cucumber framework are located in `./tests/features/**/*` directory and have the file ending `*.feature`.

All step definitions (i.e. Gherkin steps implementations, described in `*.feature` files) are located in `./tests/stepDefs/**/*` directory.

## Cucumber JavaScript framework

Some tests are written in the Cucumber framework using the [Gherkin syntax](https://cucumber.io/docs/gherkin/). That means that the test scenarios are written in plain English text.
This allows to start with the test process in the early stages of product development and involve non-technical stakeholders.
Test scenarios are located in `./tests/features/**/*` and step definitions in `./tests/stepDefs/**/*` directory.

## The Page Object Design Pattern

Page Object reduces code duplication and improves test maintenance. It serves as a layer of abstraction between tests and code.
The code is kept nice and DRY (Don't Repeat Yourself).
All page elements (selectors, methods) are stored into separate files called Pages in `./tests/_pages/**/*` directory that are represented as classes.
When the tests are run, the spec files or step definitions files (depending on the framework: Mocha or Cucumber) only call test methods from these pages.

## API tests

When the automation testing is performed it sometimes might be useful to verify the data that is seen in browser and the data that is fetched from remote API.
However, the main goal of including API tests in this project, is to demonstrate how to test API requests with help of [Axios](https://www.npmjs.com/package/axios) library in WebdriverIO involving both Mocha and Cucumber BDD frameworks.

## Run Tests

#### Running all Mocha framework's tests at once
Use the following command:
```bash
npm test
```
#### Running all Cucumber framework's tests at once
Use the following command:
```bash
npm run test-features
```
#### Running single Mocha framework's test
Use the following command:
```bash
wdio wdio.conf.js --spec ./tests/specs/<foldername>/<testname>.spec.js
```
#### Running single Cucumber framework's feature
Use the following command:
```bash
wdio wdio.conf.js --spec ./tests/features/<foldername>/<testname>.feature
```
#### Running the entire test suite
Use the following command:
```bash
npm run <suitename>
```

## Allure report

The [Allure](http://allure.qatools.ru/) Report is generated in two steps:
-  Information about executed tests is automatically saved in XML and JSON files in `./reports/allure-results` directory.
-  XML and JSON files are then transformed to a HTML report (accessed at the specific URL) with the overall test execution statistics and all necessary information to debug the test results. Use the following command to view HTML allure report in the default browser:
```bash
npm run open-allure
```
The HTML allure report also opens automatically after all frameworks-specific tests are run at once with the following commands: `npm test` or `npm run test-features`.

## Eslint

To format the code press `Ctrl+Alt+Y` on the keyboard.

## Notes

Some selectors on Amazon.com and Webstaurantstore.com are subjected to frequent changes, thus the tests located in `./tests/specs/Amazon.com/*` and `./tests/specs/Webstaurantstore.com/*` might fail and require selectors adjustment.
