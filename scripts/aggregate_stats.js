const fs = require('fs');

const round3 = x => Math.round(x * 1000) * 0.001;

const REGEX = /^\s*(\d+)\s*(#[0-9A-F]{6})\s*gray\((\d+)\)/;

const cases = [];

for (let size = 0; size <= 15; size++) {
  for (let blur = 0; blur <= 15; blur++) {
    const filename = `./stats/${size}_${blur}.png.stats`;
    const content = fs.readFileSync(filename, 'utf8');
    const colors = content
      .split('\n')
      .filter(s => s && s.length > 0)
      .map(s => REGEX.exec(s))
      .filter(Boolean)
      .map(([_1, count, hex, gray ]) => ({
        count: +count,
        // hex: hex.toLowerCase(),
        value: +gray,
      }));

    cases.push({
      size,
      blur,
      colors,
    });
  }
}

console.log('[');
for (const c of cases) {
  console.log('  ' + JSON.stringify(c) + ',');
}
console.log(']');

