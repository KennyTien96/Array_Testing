const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cxv9t1',
  defaultCommandTimeout: 25000,
  
  includeShadowDom: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
