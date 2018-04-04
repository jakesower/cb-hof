const assertEqual = require('./lib/assert-equal');

/**
 * Filter is much like map, except that takes a list and a predicate function
 * and returns a list containing only the elements of the original list for
 * which the predicate holds.
 */

function filter(list, predicateFn) {

}


// Simple cases
const isEven = x => x % 2 === 0;
assertEqual(
  filter([1, 2, 3, 4, 5], isEven),
  [2, 4]
);

const lessThan3 = x => x < 3;
assertEqual(
  filter([1, 2, 3, 4, 5], lessThan3),
  [1, 2]
);


// A case where the function would actually be useful
const anita = { name: 'Anita', dob: new Date('1999-06-04') };
const benjamin = { name: 'Benjamin', dob: new Date('2004-01-03') };
const chloe = { name: 'Chloe', dob: new Date('1950-12-29') };

const people = [anita, benjamin, chloe];

function calculateAge(person) {
  const ageInMilliseconds = Date.now() - person.dob;
  const ageDate = new Date(ageInMilliseconds);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function isAtLeast18(person) {
  return calculateAge(person) >= 18;
}

function isAtLeast21(person) {
  return calculateAge(person) >= 21;
}

assertEqual(
  filter(people, isAtLeast18),
  [anita, chloe]
);

assertEqual(
  filter(people, isAtLeast21),
  [chloe]
);


module.exports = filter;
