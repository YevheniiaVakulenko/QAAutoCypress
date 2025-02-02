const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  retries: 2,
  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
