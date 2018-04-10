const assertEqual = require('./lib/assert-equal');

/**
 * Logify is a wrapper function. It takes in a logger and a function, and logs
 * some data before and after the function is called. This is a classic wrapper
 * function.
 *
 * Wrapper functions are relatively complex. A typical application should make
 * a few of them once, then reuse them frequently. It is unlikely that you'll
 * be writing many of these, but hopefully you're using them!
 */

function logify(logger, fn) {
  return function (...args) {
    logger.log('about to call a function');
    const result = fn(...args);
    logger.log('called the function, got result');
    logger.log(result);
    return result;
  }
}

// Use case for an IIFE. We want to create a closure around a messages array
// and return multiple entities that use it.
const appender = (function () {
  let messages = [];

  return {
    messages,
    log: msg => messages.push(msg),
  }
}());

const add = (x, y) => x + y;

const loggedAdd = logify(appender, add);
const result = loggedAdd(2, 5);

assertEqual(result, 7);
assertEqual(
  appender.messages,
  ['about to call a function', 'called the function, got result', 7]
);
