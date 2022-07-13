exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-first-test/specs/first_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "Single Run iOS Test - Sky",
    build: 'WDIO iOS - Sky',
    name: 'First Run Test',
    device: 'iPhone 13',
    os_version: "15.0",
    app: 'My_Sky_App_iOS',
    'browserstack.debug': true
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};
