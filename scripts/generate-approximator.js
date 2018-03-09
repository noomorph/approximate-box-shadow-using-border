const _ = require('lodash');
const tests = require('./cases.json');

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
  const w = (bestOne.width < 10 ? ' ' : '') + bestOne.width;

  const line = [denom, w, alpha2];
  mapping.push([denom, w, alpha2]);
  console.log(`[${w}, ${alpha2}],`);
}
