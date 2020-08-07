const fs = require('fs');

const writeInProducts = (productObj) => {
  const targetFilePath = '../data/links.json';
  const initData = JSON.parse(fs.readFileSync(targetFilePath, (err, file) => file));
  initData.products.push(productObj);

  fs.writeFileSync(targetFilePath, JSON.stringify(initData));
};

module.exports = { writeInProducts };