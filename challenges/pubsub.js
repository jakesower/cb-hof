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
  // listeners is only visible inside the function
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
    listener: function (msg) {
      sum = sum + 1; // ignore the msg
    },
    getSum: () => sum,
  }
}

function makeAppender() {
  let messages = [];

  return {
    listener: function (msg) {
      messages.push(msg);
    },
    getMessages: () => messages,
  };
}


const ps = pubsub();
const adder = makeAdder();
const appender = makeAppender();
const adder2 = makeAdder();

ps.subscribe(adder.listener);
ps.publish('E.T.');
ps.subscribe(appender.listener);
ps.publish('phone');
ps.subscribe(adder2.listener);
ps.publish('home');

assertEqual(
  adder.getSum(),
  3
);

assertEqual(
  appender.getMessages(),
  ['phone', 'home']
);

assertEqual(
  adder2.getSum(),
  1
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

hotps.subscribe(hotAdder.listener);
hotps.publish('E.T.');
hotps.subscribe(hotAppender.listener);
hotps.publish('phone');
hotps.subscribe(hotAdder2.listener);
hotps.publish('home');

assertEqual(
  hotAdder.getSum(),
  3
);

assertEqual(
  hotAppender.getMessages(),
  ['E.T.', 'phone', 'home']
);

assertEqual(
  hotAdder2.getSum(),
  3
);


/**
 * Challenge 2: Singular Value PubSub
 * Create a function called singularPubsub that listens for a single publish
 * event, remembers the result, transmits it to current subscribers, then
 * replays it to new subscribers just like in the hot pubsub.
 */

function singularPubsub() {

}

const singps = singularPubsub();
const singAdder = makeAdder();
const singAdder2 = makeAdder();
const singAppender = makeAppender();
const singAppender2 = makeAppender();

singps.subscribe(singAdder.listener);
singps.subscribe(singAppender.listener);
singps.publish('E.T.');
singps.publish('phone');
singps.subscribe(singAdder2.listener);
singps.subscribe(singAppender2.listener);
singps.publish('home');

assertEqual(
  singAdder.getSum(),
  1
);

assertEqual(
  singAppender.getMessages(),
  ['E.T.']
);

assertEqual(
  singAdder2.getSum(),
  1
);

assertEqual(
  singAppender2.getMessages(),
  ['E.T.']
);
