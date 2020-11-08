const fs = require('fs');
const path = require('path');

const writeInProducts = (productsObj) => {
  const targetFilePath = path.resolve(__dirname, '../data/products.json');
  const initData = JSON.parse(fs.readFileSync(targetFilePath, (err, file) => file));
  initData.products.push(...productsObj);

  fs.writeFileSync(targetFilePath, JSON.stringify(initData, null, 2));
};

module.exports = { writeInProducts };