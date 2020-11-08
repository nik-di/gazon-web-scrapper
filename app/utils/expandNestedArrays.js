const expandNestedArrays = (arr) => {
  return arr.reduce((resArr, currentArr) => {
    currentArr.forEach(item => resArr.push(item));
    return resArr;
  }, []);
};

module.exports = { expandNestedArrays };