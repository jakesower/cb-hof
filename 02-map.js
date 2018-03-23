const assertEqual = require('./lib/assert-equal');

/*
 * Example 1:
 * Double each element of an array
 */

function doubleList(list) {
  let output = [];
  for (let i = 0, l = list.length; i < l; i += 1) {
    let doubled = list[i] * 2;
    output.push(doubled);
  }
  return output;
}

// Test it:
assertEqual(
  doubleList([1, 2, 3]),
  [2, 4, 6]
);


/*
 * Example 2:
 * Add an exclamation point at the end of each string
 */

function makeExciting(list) {
  let output = [];
  for (let i = 0, l = list.length; i < l; i += 1) {
    let exciting = list[i] + '!';
    output.push(exciting);
  }
  return output;
}

assertEqual(
  makeExciting(['so', 'cool!']),
  ['so!', 'cool!!']
);


/*
 * Example 4:
 * Pull the function out from the boring stuff with map
 */

 function map(list, fn) {          // ⭐ Important function! ⭐
  let output = [];
  for (let i = 0, l = list.length; i < l; i += 1) {
    let mapped = fn(list[i]);
    output.push(mapped);
  }
  return output;
}


const double = n => n * 2;
const exclaim = str => str + '!';

assertEqual(
  map([1, 2, 3], double),
  [2, 4, 6]
);
assertEqual(
  map(['so', 'cool!'], exclaim),
  ['so!', 'cool!!']
);


module.exports = map;
