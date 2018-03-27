const assertEqual = require('./lib/assert-equal');

/**
 * Example 1: Following a Bomb
 * Functions can be passed around like other values in JavaScript. We'll
 * explore this aspect of the language with a poorly written spy thriller. :)
 */

// This function has not been called, so it doesn't throw.
function bomb() {
  throw 'BOOM!';
}

/**
 *  The bad guys are trying to build a bomb to destroy the new metro stations.
 */
const rita = {
  name: 'Rita the Wrench',
  specialty: 'Bomb Making',
  goodGuy: false,
  perform: function () {
    // The bomb will not explode here because the function has not been
    // called. It is still a function, however.
    return bomb;
  }
};

const martin = {
  name: 'Martin the Many-Faced',
  specialty: 'Impersonation',
  goodGuy: false,
  perform: function (target) {
    return target;
  }
};

const ursula = {
  name: 'Ursula the Unwitting',
  perform: () => {}, // a function that does nothing
  goodGuy: true,
};

const dilma = {
  name: 'Dilma the Disposer',
  perform: function (bomb) {
    try {
      bomb(); // this will call the bomb function, which will throw
    }
    catch (err) {
      return 'nothing';
    }
  },
  goodGuy: true,
};

const isGoodGuy = function (person) {
  return person.goodGuy;
};

const metroStation = {
  // isGoodGuy is executed here; rather, it's assigned to an attribute within
  // the new object
  isAllowedAccess: isGoodGuy,
};


// Let's run a scenario
function scenario() {
  const target = metroStation;
  const theBomb = rita.perform();

  // Call isAllowedAccess, which calls isGoodGuy
  const accessDenied = target.isAllowedAccess(martin);

  const martinPersona = martin.perform(ursula);
  const accessGranted = target.isAllowedAccess(martinPersona);

  const result = dilma.perform(theBomb);
  assertEqual(
    result,
    'nothing'
  );
}

scenario();
