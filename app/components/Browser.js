class Browser {
  constructor(puppeteer) {
    this.browser = puppeteer.launch({ headless: true });
  }

  getBrowser() {
    const browser = this.browser;
    return browser;
  }

  closeBrowsers() {
    this.browser.then(browser => browser.close());
  }
}

module.exports = Browser;