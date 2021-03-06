const assertEqual = require('./lib/assert-equal');

/**
 * Reduce is the most powerful of the higher order functions. All of the other
 * other HOFs that we cover can be implemented using reduce.
 *
 * Examples:
 *
 * const add = (a, b) => a + b;
 * reduce([1, 2, 3, 4], 0, add);
 *
 * First, call the reducer (add) with the initialValue and the first element of
 * the list:
 * add(0, 1) => 1
 *
 * Next, call the reducer (add) with the accumulator and the next element of
 * the list:
 * add(1, 2) => 3
 *
 * Repeat:
 * add(3, 3) => 6
 * add(6, 4) => 10
 *
 * Since 10 is the result of the last reducer invocation, return 10.
 *
 * Example 2:
 *
 * const maximum = (a, b) => (a > b) ? a : b;
 * reduce([1, 2, 4, 3], -Infinity, maximum);
 *
 * This results in the following calls:
 * maximum(-Infinity, 1) => 1
 * maximum(1, 2) => 2
 * maximum(4, 2) => 4
 * maximum(4, 3) => 4
 *
 * return 4
 */

function reduce(list, initialValue, reducer) {

}

const add = (a, b) => a + b;
assertEqual(
  reduce([1, 2, 3, 4], 0, add),
  10,
  'Reduce 1'
);

const maximum = (a, b) => (a > b) ? a : b;
assertEqual(
  reduce([1, 2, 4, 3], -Infinity, maximum),
  4,
  'Reduce 2'
);

assertEqual(
  reduce([1, 2, 4, 3], 15, maximum),
  15,
  'Reduce 3'
);


// Implement a test that takes a list of letters and returns the letters
// concatenated together. Use reduce to do so.
// Example: ['a', 'b', 'c'] -> 'abc'
assertEqual(
  'please change me',
  'to the test described above',
  'Reduce 4'
);



// BONUS: Implement map and filter using reduce.
