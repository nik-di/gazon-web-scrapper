const fs = require('fs');

const writeInPagesLinks = (linkObj) => {
  const targetFilePath = '../data/links.json';
  const initData = JSON.parse(fs.readFileSync(targetFilePath, (err, file) => file));
  initData.links.push(linkObj);

  fs.writeFileSync(targetFilePath, JSON.stringify(initData));
};

module.exports = { writeInPagesLinks };