exports.config = {
  tests: './tests/*.browser.test.ts',
  output: './tests/output',
  helpers: {
    WebDriver: {
      url: 'http://localhost:9000',
      browser: 'chrome'
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'reviewer-client',
  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
}