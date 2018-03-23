const assertEqual = require('../lib/assert-equal');

/**
 * Functions do best when dealing with simple data structures, specifically
 * strings, numbers, booleans, null, arrays, and POJOs (plain old JavaScript
 * objects). This section covers the use of functions to manipulate these
 * common structures.
 *
 * An advantage of this approach in contrast to traditional OO is that the
 * same functions can be applied across a large domain of these simpler data
 * structures, rather than conforming to any given object's specific interface.
 *
 * We'll be using a subset of team data from the FIFA Men's World Cup to derive
 * and play with these functions.
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

// Direct approach
function getStar1(team) {
  // ??? please implement this
}

assertEqual(
  getStar1('argentina'),
  { firstName: 'Lionel', lastName: 'Messi' },
  "getStar1('argentina')"
);
assertEqual(
  getStar1('brazil'),
  { firstName: 'Neymar', lastName: '¯\_(ツ)_/¯' },
  "getStar1('brazil')"
);



// Defaulting function approach
function getStarAttr(team) {
  return teamData[team].star;
}

function withDefaults(defaults, fn) {
  return function () {
    return Object.assign({}, defaults, fn.apply(null, arguments));
  }
}

const getStar2 = withDefaults({ lastName: '¯\_(ツ)_/¯' }, getStarAttr);

// Test it:
assertEqual(
  getStar2('argentina'),
  { firstName: 'Lionel', lastName: 'Messi' },
  "getStar2('argentina')"
);
assertEqual(
  getStar2('brazil'),
  { firstName: 'Neymar', lastName: '¯\_(ツ)_/¯' },
  "getStar2('brazil')"
);


/**
 * Challenge 2: Rank the teams by the number of world cup titles they have.
 * Output should be a string of the country's name and the number of titles
 * they have, sorted from most titles to fewest.
 */

// Direct approach (please try doing this yourself first)
function showTitles1() {
  // ???
}

// Functional approach
function sortBy(list, fn) {     // ⭐ Important function! ⭐
  // Take a binary function that returns a negative number if the first argument
  // is less than the second, 0 if they're equal, and a positive number
  // otherwise. This function should return a sorted list based on the results
  // of that function.
}

function outputString(team) {
  // Take a team and return a string according to the output.
  // Example: Germany: 4 titles
}

function showTitles2() {
  function sortingFunction(t1, t2) {
    return t1.titles.length - t2.titles.length;
  }
  const sortedTeams = sortBy(teams, sortingFunction);
  const output = sortedTeams.map(outputString);
  return output;
}

// Test it
const correctOutput2 = [
  'Brazil: 5 titles',
  'Germany: 4 titles',
  'Argentina: 2 titles',
];

assertEqual(showTitles1(), correctOutput2);
assertEqual(showTitles2(), correctOutput2);


/**
 * Challenge 3: Output a series of letters representing each team's victories
 * by year of victory. The letter in the string is the first letter of the
 * country's name.
 */
const correctOutput3 = 'GBBBGAAGBBG';

// Direct approach (please try doing this yourself first)
function showVictoryLetters1() {

}

// Functional approach 1
function toLetterYearPair(team) {
  // Create a pairs of letters and victory years.
  // Example: argentina -> [['A', 1978], ['A', 1986]]
}

function values(obj) {
  // Returns the values of an object
  return Object.keys(obj).map(k => obj[k]);
}

function append(list1, list2) { // ⭐ Important function! ⭐
  // Appends one list to another
  if (!Array.isArray(list1) || !Array.isArray(list2)) {
    throw 'both arguments must be a list!';
  }

  return list1.concat(list2);
}

function unnest(pairs) {      // ⭐ Important function! ⭐
  // Takes an array of arrays and flattens into a single array, only removing
  // one layer of nesting
  // This one may be challenging to conceptualize, but it can be represented
  // with append and another higher order function you're familiar with
  // Example: [[1, 2], [3, 4]] -> [1, 2, 3, 4]
  // Example: [[[1, 2], [3, 4], 5]] -> [[1, 2], [3, 4], 5]

}

function showVictoryLetters2() {
  const teamList = values(teamData);
  const pairs = teamList.map(toLetterYearPair);
  // ??? (hint: use unnest and the sortBy function from challenge 2)
}

// Functional approach 2
function chain(list, fn) {     // ⭐ Important function! ⭐
  return unnest(list.map(fn));
}

function showVictoryLetters3() {
  // implement using chain and other functions
}


assertEqual(showVictoryLetters1(), correctOutput3);
assertEqual(showVictoryLetters2(), correctOutput3);
assertEqual(showVictoryLetters3(), correctOutput3);
