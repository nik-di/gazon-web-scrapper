const pupp = require('puppeteer');
const fs = require('fs');

async function getPic() {
    const browser = await pupp.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://yandex.ru');
    await page.setViewport({ width: 1020, height: 960});
    await page.screenshot({ path: 'images/ya.png' });

    // await browser.close();
}

getPic();