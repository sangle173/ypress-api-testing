import { defineConfig } from 'cypress';
import { addMochaReporter } from '@cypress/webpack-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/api/**/*.spec.ts',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/html',
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});

