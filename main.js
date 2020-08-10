const puppeteer = require('puppeteer');
const path = require('path');
const Parser = require(path.resolve(__dirname, 'app/components/Parser'));
const Browser = require(path.resolve(__dirname, 'app/components/Browser'));
const { writeInProducts } = require(path.resolve(__dirname, 'app/utils/writeInProducts'));
const { expandNestedArrays } = require(path.resolve(__dirname, 'app/utils/expandNestedArrays'));

const firstPageCatalog = 'https://gazoncity.ru/catalog/';
const browser = new Browser(puppeteer);
const parser = new Parser(browser.getBrowser());

const getPagesLinksPromises = (pagesArr) => {
  return pagesArr.map(async page => {
    return await parser.parse(page, 'products-links');
  });
};

const getProductsPromises = (productsLinksArr) => {
  return productsLinksArr.map(async productPageLink => {
    const res = await parser.parse(productPageLink, 'products-props');
    return res;
  });
};

(async () => {

  const pages = await parser.parse(firstPageCatalog, 'pages-links');

  const promises = getPagesLinksPromises(pages);

  return await Promise.all(promises);
})()
  .then(productsLinksPromises => {
    const productsLinks = expandNestedArrays(productsLinksPromises);
    return productsLinks;
  })
  .then(async productsLinks => {
    const products = getProductsPromises(productsLinks.slice(0, 5));
    const productsPromises = await Promise.all(products);
    return productsPromises;
  })
  .then(products => {
    console.log('products > ', products);
    writeInProducts(products);
    return;
  })
  .catch(err => {
    console.error('Main module Error: ', err);
    new Error(err);
  })
  .finally(() => {
    browser.closeBrowsers();
  });