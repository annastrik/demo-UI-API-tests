const { config } = require('./wdio.conf.js');

config.specs = [
  './tests/features/**/*.feature'
];

config.suites = {
  tophap: ['./tests/features/Tophap.com/*.feature'],
};

// config.exclude = [
//   './tests/features/Tophap.com/filterResult.feature',
//   './tests/features/Tophap.com/searchResult.feature',
//   './tests/features/Tophap.com/sortResult.feature',
// ];

config.framework = 'cucumber';

config.cucumberOpts = {
  requireModule: ['@babel/register'],
  require: ['./tests/stepDefs/**/*.js'],
  backtrace: false,
  failAmbiguousDefinitions: true,
  compiler: ['js:babel-core/register'],
  dryRun: false,
  failFast: false,
  format: ['pretty'],
  name: [],
  snippets: true,
  snippetSyntax: undefined,
  source: false,
  profile: [],
  strict: false,
  tagExpression: 'not @Pending',
  tagsInTitle: false,
  timeout: 20000,
  ignoreUndefinedDefinitions: false,
  scenarioLevelReporter: false
};

config.afterStep = function () {
  const date = Date.now();
  browser.saveScreenshot(`./reports/screenshots/Chrome - ${date}.png`);
};

exports.config = config;
