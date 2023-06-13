import spinnerJSON from './spinners.json' assert { type: 'json' };
const spinners = Object.assign({}, spinnerJSON);
const spinnersList = Object.keys(spinners);
Object.defineProperty(spinners, 'random', {
  get() {
    const randomIndex = Math.floor(Math.random() * spinnersList.length);
    const spinnerName = spinnersList[randomIndex];
    return spinners[spinnerName];
  },
});

export default spinners;
