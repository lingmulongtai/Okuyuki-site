const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: 'tests',
  reporter: [['list']],
  use: { baseURL: 'file://' + __dirname + '/' },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
  ],
});
