const assertEqual = require('../lib/assert-equal');

/**
 * These are the same problems as from Day 1. However, in this exercise I have
 * added a few guiding functions to illustrate some more functional approaches
 * to solving them. If you want to get the most out of these challenges, the
 * most important rule is:
 *
 * Don't use any loops! Higher order functions only!
 */

const teamData = {
  argentina: {
    name: 'Argentina',
    titles: [1978, 1986],
    star: { firstName: 'Lionel', lastName: 'Messi' },
  },
  brazil: {
    name: 'Brazil',
    titles: [1958, 1962, 1970, 1994, 2002],
    star: { firstName: 'Neymar' },
  },
  germany: {
    name: 'Germany',
    titles: [1954, 1974, 1990, 2014],
    star: { firstName: 'Thomas', lastName: 'Müller' },
  }
};


/**
 * Challenge 1: Display the star play with a first and last name. If the last
 * name of a player is unknown, put ¯\_(ツ)_/¯.
 */

function getStarAttr(team) {
  return teamData[team].star;
}

function withDefaults(defaults, fn) {
  return function () {
    return Object.assign({}, defaults, fn.apply(null, arguments));
  }
}

function getStar(country) {
  // implement in terms of the above two functions
}

// Test it:
assertEqual(
  getStar('argentina'),
  { firstName: 'Lionel', lastName: 'Messi' },
  'Get Star 1'
);
assertEqual(
  getStar('brazil'),
  { firstName: 'Neymar', lastName: '¯\_(ツ)_/¯' },
  'Get Star 2'
);


/**
 * Challenge 2: Rank the teams by the number of world cup titles they have.
 * Output should be a string of the country's name and the number of titles
 * they have, sorted from most titles to fewest.
 */

function showTitles() {
  // ???
}

const correctOutput2 = [
  'Brazil: 5 titles',
  'Germany: 4 titles',
  'Argentina: 2 titles',
];

assertEqual(showTitles(), correctOutput2, 'Show Titles');


/**
 * Challenge 3: Output a series of letters representing each team's victories
 * by year of victory. The letter in the string is the first letter of the
 * country's name.
 */

// some helper functions

// Returns the values of an object
function values(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

// Appends one list to another
function append(list1, list2) {
  if (!Array.isArray(list1) || !Array.isArray(list2)) {
    throw 'both arguments must be a list!';
  }

  return list1.concat(list2);
}

// Like the built in `Array.prototype.sort`, but doesn't modify the incoming
// list. Not the most efficient implementation, but it'll do.
function sortBy(list, fn) {
  if (list.length === 0) {
    return [];
  }

  const [head, ...tail] = list;
  const smaller = tail.filter(v => fn(v, head) <= 0);
  const bigger = tail.filter(v => fn(v, head) > 0);

  return sortBy(smaller, fn).concat([head]).concat(sortBy(bigger, fn));
}

const correctOutput3 = 'GBBBGAAGBBG';

// Functional approach 1
function toLetterYearPair(team) {
  // Create a pairs of letters and victory years.
  // Example: argentina -> [['A', 1978], ['A', 1986]]
}

function unnest(pairs) {      // ⭐ Important function! ⭐
  // Takes an array of arrays and flattens into a single array, only removing
  // one layer of nesting
  // This one may be challenging to conceptualize, but it can be represented
  // with append and another higher order function you're familiar with
  // Example: [[1, 2], [3, 4]] -> [1, 2, 3, 4]
  // Example: [[[1, 2], [3, 4], 5], [6]] -> [[1, 2], [3, 4], 5, 6]

}

function showVictoryLetters1() {
  const teamList = values(teamData);
  const pairs = teamList.map(toLetterYearPair);
  // ??? (hint: use unnest and the sortBy functions)
}

// Functional approach 2
function chain(list, fn) {     // ⭐ Important function! ⭐
  return unnest(list.map(fn));
}

function showVictoryLetters2() {
  // implement using chain and other functions
}


assertEqual(showVictoryLetters1(), correctOutput3, 'Show Victory Letters 1');
assertEqual(showVictoryLetters2(), correctOutput3, 'Show Victory Letters 2');
