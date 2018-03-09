const ff = x => x < 10 ? '0'+x : ''+x;
const round3 = x => Math.round(x * 1000) / 1000;

const fs = require('fs');

const REGEX = /^\s*(\d+)\s*([0-9A-F]{6})\s*gray\((\d+)\)/;

const cases = [];

for (let size = 0; size <= 15; size++) {
  for (let blur = 0; blur <= 15; blur++) {
    const filename = `${ff(size)}_${ff(blur)}.png.stats`;
    const content = fs.readFileSync(filename, 'utf8');
    const colors = content
      .split('\n')
      .filter(s => s && s.length > 6)
      .map(s => REGEX.exec(s) || [])
      .map(([_1, count, color, gray ]) => ({ count: +count, value: +gray }));

    cases.push({
      size,
      blur,
      colors,
    });
  }
}

console.log(JSON.stringify(cases, null, 4));

