const assertEqual = require('../lib/assert-equal');

/**
 * Functions can be used to wrap other functions to act as interfaces over
 * other pieces of code. This set of challenges will showcase potential uses
 * for wrapper functions.
 */

/**
 * Challenge 1: Encase
 * Encase a function to make sure a value is always returned, even if the
 * wrapped function throws. Calls the function fn and returns its value unless
 * it throws, at which point the safety value is returned instead.
 */
function encase(fn, safeReturn) {
  return function (...args) {
    try {
      return fn(...args);
    } catch (err) {
      return safeReturn;
    }
  }
}


// Testing stuff
function httpResponder(userFn) {
  const err500 = {
    status: '500',
    body: '🙀',
  };

  return encase(userFn, err500);
}

function divider(n, d) {
  if (d === 0) {
    throw 'divided by zero!!!!';
  }

  return {
    status: '200',
    body: (n / d).toString(),
  };
}

assertEqual(
  httpResponder(divider)(2, 1).status,
  '200',
  'Encase 1'
);

assertEqual(
  httpResponder(divider)(1, 0).status,
  '500',
  'Encase 2'
);

/**
 * Challenge 2: Time a function's execution.
 *
 * The function should return an object like so:
 * {
 *   value: (the value of running fn),
 *   time: (the number of milliseconds to run the fn)
 * }
 *
 * JS language hint:
 * Date.now() will return the current time in epoch milliseconds
 */

function timeFunction(fn) {
  return function (...args) {
    const start = Date.now();
    const value = fn(...args);
    return {
      value,
      time: Date.now() - start
    }
  }
}


// please feel free to adjust this number--the bigger it is the longer the
// function will take to run
const slow = 100000000;
function addSlowly(a, b) {
  let j = 0;
  for(i=0; i<slow; i+=1) {
    j = j + i;
  }
  return a + b;
}

const slowPoke = timeFunction(addSlowly)(1, 2);
assertEqual(slowPoke.value, 3, 'Time Function');
console.log(`the following number should be reasonably large: ${slowPoke.time}`);



/**
 * Challenge 3: Wraped Callback
 * A lambda callback into succeed and fail functions.
 * Context: AWS lambda functions have the following signature:
 * function (event, context, callback) { ... }
 * The callback argument is a function that is to be invoked once the lambda
 * has a result. The callback is invoked differently depending on if the
 * lambda's execution was successful:
 *
 * Successful execution: callback(null, successValue)
 * Failed execution: callback(failureValue)
 *
 * The goal is to make that interface less clunky by wrapping it.
 */
function wrapLambdaCallback(callback) {
  return {
    succeed: data => callback(null, data),
    fail: callback
  };
}

function testCallback(err, value) {
  return err ?
    `failed with value: ${err}` :
    `succeeded with value: ${value}`;
}

const wrappedCallbacks = wrapLambdaCallback(testCallback);
assertEqual(
  wrappedCallbacks.succeed('yay'),
  'succeeded with value: yay',
  'Wrapped Callbacks 1'
);
assertEqual(
  wrappedCallbacks.fail('uh oh'),
  'failed with value: uh oh',
  'Wrapped Callbacks 2'
);
