const boldYellowC = '\u001b[33m\u001b[1mc\u001b[22m\u001b[39m';
const pacmanTemplate = `[c${'o  '.repeat(19)}o ]`;
let frames = [pacmanTemplate];

let curr = pacmanTemplate;
for (let c = 2; c < pacmanTemplate.length - 1; c++) {
  const right = curr.substring(c + 1);
  const left = curr.substring(0, c - 1) + '-';
  curr = left + 'c' + right;
  frames.push(curr);
}

frames = frames.map((f) => f.replace('c', boldYellowC));
for (let f of frames) console.log(f);
