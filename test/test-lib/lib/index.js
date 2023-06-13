module.exports = {
  sum(a, b) {
    return a + b;
  },
  init({ option, param }) {
    console.log(`Executing init..., option: ${option}, param: ${param}`);
  },
};
