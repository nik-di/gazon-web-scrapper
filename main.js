const puppeteer = require('puppeteer');
const path = require('path');
const Parser = require(path.resolve(__dirname, 'app/components/Parser'));
const Browser = require(path.resolve(__dirname, 'app/components/Browser'));
const { writeInLinks } = require(path.resolve(__dirname, 'app/utils/writeInLinks'));
const { writeInProductsLinks } = require(path.resolve(__dirname, 'app/utils/writeInProductsLinks'));

const firstPageCatalog = 'https://gazoncity.ru/catalog/';
const browser = new Browser(puppeteer);
const parser = new Parser(browser.getBrowser());

(async () => {

  const pages = await parser
    .parse(firstPageCatalog, 'pages-links')
    .then(links => links)
    .catch(err => {
      return err;
    })
  return pages;

})()
  .then(res => {
    console.log(res);
    browser.closeBrowsers();
  })
  .catch(err => {
    console.error('Main module Error: ', err);
    new Error(err);
  });