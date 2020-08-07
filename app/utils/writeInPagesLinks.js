const fs = require('fs');

const writeInPagesLinks = (linkObj) => {
  const targetFilePath = '../data/pagesLinks.json';
  const initData = JSON.parse(fs.readFileSync(targetFilePath, (err, file) => file));
  initData.links.push(linkObj);

  fs.writeFileSync(targetFilePath, JSON.stringify(initData));
};

module.exports = { writeInPagesLinks };