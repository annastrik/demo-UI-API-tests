const { config } = require('./wdio.conf.js');

config.specs = [
  './tests/TopHap.com/features/*.feature'
];

config.suites = {
  tophap: ['./tests/TopHap.com/features/*.feature'],
};

// config.exclude = [
//   './tests/TopHap.com/features/filterResult.feature',
//   './tests/TopHap.com/features/searchResult.feature',
// ];

config.framework = 'cucumber';

config.cucumberOpts = {
  requireModule: ['@babel/register'],
  require: ['./tests/TopHap.com/stepDefs/*.js'],
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
