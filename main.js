const puppeteer = require('puppeteer');
const path = require('path');
const Parser = require(path.resolve(__dirname, 'app/components/Parser'));
const Browser = require(path.resolve(__dirname, 'app/components/Browser'));
const { writeInLinks } = require(path.resolve(__dirname, 'app/utils/writeInLinks'));
const { writeInPagesLinks } = require(path.resolve(__dirname, 'app/utils/writePagesInLinks'));
const { writeInProducts } = require(path.resolve(__dirname, 'app/utils/writeInProducts'));

const fPage = 'https://gazoncity.ru/catalog/';
const browser = new Browser(puppeteer);
const parser = new Parser(browser.getBrowser());
