var browserstack = require('browserstack-local');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "Local Run iOS Test - Sky",
    build: 'WDIO iOS - Sky',
    name: 'Local Run Test',
    device: 'iPhone 13',
    os_version: "15.0",
    app: 'My_Sky_App_iOS',
    'browserstack.local': true,
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
    timeout: 30000
  },

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    console.log("Connecting local");
    return new Promise( (resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.key }, (error) => {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: (capabilties, specs) => {
    console.log("Closing local tunnel");
    return new Promise( (resolve, reject) => {
      exports.bs_local.stop( (error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");

        resolve();
      });
    });
  }
};
