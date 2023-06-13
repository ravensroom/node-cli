#!/usr/bin/env node
import ora, { oraPromise } from 'ora';

// const spinner = ora('Loading...').start();

// spinner.color = 'red';
// spinner.text = 'Reading...';
// spinner.prefixText = 'Downloading chalk...';

// let percent = 0;

// let task = setInterval(() => {
//   percent += 20;
//   spinner.text = `Loading ${percent} %`;
//   if (percent === 100) {
//     spinner.stop();
//     spinner.succeed('Finished downloading.');
//     clearInterval(task);
//   }
// }, 1000);

(async function () {
  const promise = new Promise((resolve) => {
    console.log('Executing tasks...');
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  await oraPromise(promise, {
    successText: 'Success!',
    failText: 'Failure',
    prefixText: 'Downloading ora...',
    text: 'Loading...',
    spinner: {
      interval: 100,
      frames: ['—', '\\', '/', '—'],
    },
  });
})();
