const assertEqual = require('../lib/assert-equal');

/**
 * Pubsubs are systems that use publishers and subscribers. Subscribers are
 * functions that are attached to publishers. When the publisher recieves a
 * message, each listener is notified. This may seem to be a strange
 * application for functions, but they do nicely. This is not a purely
 * functional implementation, and may look a lot like OO.
 *
 * Closures are the key.
 */

function pubsub() {
  // listeners is an array of functions to be called when a message is
  // published
  let listeners = [];

  function subscribe(fn) {
    listeners.push(fn);
  }

  function publish(msg) {
    listeners.forEach(fn => fn(msg));
  }

  // the returned functions will be able to use listeners
  return {
    subscribe: subscribe,
    publish: publish,
  };
}

function makeAdder() {
  let sum = 0;

  return {
    getSum: () => sum,
    add1: function (msg) {
      sum = sum + 1; // ignore the msg
    },
  }
}

function makeAppender() {
  let messages = [];

  return {
    messages,
    appendMessage: function (msg) {
      messages.push(msg);
    },
  };
}


const ps = pubsub();
const adder = makeAdder();
const appender = makeAppender();
const adder2 = makeAdder();

ps.subscribe(adder.add1);
ps.publish('E.T.');
ps.subscribe(appender.appendMessage);
ps.publish('phone');
ps.subscribe(adder2.add1);
ps.publish('home');

assertEqual(
  adder.getSum(),
  3,
  'Pubsub 1'
);

assertEqual(
  appender.messages,
  ['phone', 'home'],
  'Pubsub 2'
);

assertEqual(
  adder2.getSum(),
  1,
  'Pubsub 3'
);


/**
 * Challenge 1: Hot PubSub
 * Create a function called hotPubsub that acts exactly like the pubsub above,
 * put replays all messages that have been already received to new subscribers.
 */


function hotPubsub() {

}

const hotps = hotPubsub();
const hotAdder = makeAdder();
const hotAppender = makeAppender();
const hotAdder2 = makeAdder();

hotps.subscribe(hotAdder.add1);
hotps.publish('E.T.');
hotps.subscribe(hotAppender.appendMessage);
hotps.publish('phone');
hotps.subscribe(hotAdder2.add1);
hotps.publish('home');

assertEqual(
  hotAdder.getSum(),
  3,
  'Hot Pubsub 1'
);

assertEqual(
  hotAppender.messages,
  ['E.T.', 'phone', 'home'],
  'Hot Pubsub 2'
);

assertEqual(
  hotAdder2.getSum(),
  3,
  'Hot Pubsub 3'
);


/**
 * Challenge 2: Singular Value PubSub
 * Create a function called singularPubsub that listens for a single publish
 * event, remembers the result, transmits it to current subscribers, then
 * replays it to new subscribers just like in the hot pubsub. Messages after
 * the first should be ignored.
 */

function singularPubsub() {

}

const singps = singularPubsub();
const singAdder = makeAdder();
const singAdder2 = makeAdder();
const singAppender = makeAppender();
const singAppender2 = makeAppender();

singps.subscribe(singAdder.add1);
singps.subscribe(singAppender.appendMessage);
singps.publish('E.T.');
singps.publish('phone');
singps.subscribe(singAdder2.add1);
singps.subscribe(singAppender2.appendMessage);
singps.publish('home');

assertEqual(
  singAdder.getSum(),
  1,
  'Singular Pubsub 1'
);

assertEqual(
  singAppender.messages,
  ['E.T.'],
  'Singular Pubsub 2'
);

assertEqual(
  singAdder2.getSum(),
  1,
  'Singular Pubsub 3'
);

assertEqual(
  singAppender2.messages,
  ['E.T.'],
  'Singular Pubsub 4'
);
