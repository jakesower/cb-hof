const assertEqual = require('./lib/assert-equal');

/*
 * Example 1:
 * Extend the doubleList and tripleList functions to take in a second number to
 * use to multiply the list items by.
 */

function multiplyList(list, factor) {
  let output = [];
  for (let i = 0, l = list.length; i < l; i += 1) {
    let multiplied = list[i] * factor;
    output.push(multiplied);
  }
  return output;
}

// Test it:
assertEqual(
  multiplyList([1, 2, 3], 5),
  [5, 10, 15]
);


function makeMultiplier(factor) {
  return function (n) {
    return factor * n;
  }
}

const quadrupler = makeMultiplier(4);
assertEqual(
  map([1, 2, 3], quadrupler),
  [4, 8, 12]
);

assertEqual(
  map([1, 2, 3], makeMultiplier(5)),
  [5, 10, 15]
);


