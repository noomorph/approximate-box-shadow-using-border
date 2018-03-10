const _ = require('lodash');
const zlib = require('zlib');
const fs = require('fs');
const tests = JSON.parse(zlib.gunzipSync(fs.readFileSync('./cases.json.gz')));

const ff = (x, s = ' ') => (x < 10 ? s : '') + x;
const SIZE = 40;

function distance(gray1, gray2) {
  const dg = gray1 - gray2;
  return dg * dg;
}

function overall_distance(colors, borderPixels, borderColor) {
  let borderPixelsLeft = borderPixels;
  let D = 0;

  for (const color of colors) {
    const { value, count } = color;

    const W = -Math.min(borderPixelsLeft - count, 0);
    const B = W > 0 ? borderPixelsLeft : count;
    borderPixelsLeft -= B;

    D += W * distance(255, value) + B * distance(borderColor, value);
  }

  return D;
}

function approximate_for_border_width(colors, borderWidth) {
  const borderPixels = 4 * borderWidth * (SIZE + borderWidth);
  // const outerPixels = (8 * SIZE * SIZE) - borderPixels;

  const shades = borderWidth === 0 ? [255] : _.times(255, v => v + 1);
  const pairs = _.map(shades, borderColor => overall_distance(colors, borderPixels, borderColor));
  const bestBorderColor = _.minBy(shades, borderColor => overall_distance(colors, borderPixels, borderColor));
  const bestColorDistance = overall_distance(colors, borderPixels, bestBorderColor);

  return { color: bestBorderColor, distance: bestColorDistance, width: borderWidth };
}

function remove_inner_white_square(colors) {
  const innerPixels = SIZE * SIZE;
  const whiteColor = colors.find(c => c.value === 255);
  whiteColor.count -= innerPixels;
}

function sort_colors_from_black_to_white(colors) {
  colors.sort((a, b) => a.value - b.value);
}

// const CSV_SEPARATOR = '\t';
// console.log([ 'blur', 'width', 'color', 'size' ].map(s => JSON.stringify(s)).join(CSV_SEPARATOR));

const mapping = [];
for (const test of tests) {
  const { size, blur, colors } = test;

  remove_inner_white_square(colors);
  sort_colors_from_black_to_white(colors);

  const widths = _.times(20, w => approximate_for_border_width(colors, w))
  const bestOne = _.minBy(widths, 'distance');

  const denom = (size << 4) + blur;
  const alpha = 1 - (bestOne.color / 255);
  const alpha2 = (Math.round(alpha * 100) * 0.01).toFixed(2);

  mapping.push(`[${ff(bestOne.width)}, ${alpha2}]`);
}

console.log('const SHADOW_APPROXIMATION_MAP = [');
console.log(' '.repeat(14) + _.times(16, i => `/*blur=${ff(i, '0')}*/`).join(' '));
_.chunk(mapping, 16).forEach((chunk, i) => console.log(`/* size=${ff(i, '0')} */ ` + chunk.join(', ') + ','));
console.log('];');
