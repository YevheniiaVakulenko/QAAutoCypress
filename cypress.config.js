const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  retries: 2,
  env: {
    username: process.env.CYPRESS_USERNAME_AUTH,
    passwordAuth: process.env.CYPRESS_PASSWORD_AUTH,

    urlNorm:process.env.CYPRESS_URL_NORM,
    emailNorm:process.env.CYPRESS_EMAIL_NORM,
    passwordNorm:process.env.CYPRESS_PASSWORD_NORM,

    urlBug:process.env.CYPRESS_URL_BUG,
    emailBug:process.env.CYPRESS_EMAIL_BUG,
    passwordBug:process.env.CYPRESS_PASSWORD_BUG,

    VERSION: process.env.VERSION
  },
  e2e: {
    slowMo: 500,
    testIsolation: false,
    envFile: process.env.ENV_FILE,
    //process.env.CYPRESS_ENV_FILE,
    //baseUrl: Cypress.env('baseURL'),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
