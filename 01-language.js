/**
 * JavaScript Language Reference
 *
 * Obviously this won't cover the entire scope of the language. It should
 * provide information that may not be intuitive, or otherwise useful to the
 * discussions.
 */


/**
 * Function Definition
 *
 * Defining a function is not the same as calling it. Each of these definitions
 * are equivalent within the context of these classes. However, there are
 * important differences when using `this` within a function. I recommend
 * writing code in such a way that `this` comes up as little as possible.
 *
 * A key point is that functions are inert until they are called. You can pass
 * a function around many times before the code inside of it ever runs. In some
 * cases, the function is never actually called, but it still exists as an
 * entity within the run time.
 */

// This is the standard form. It will be used frequently.
function addStandard(x, y) {
  return x + y;
}

// This form will be used primarily when returning a function from inside
// another.
const addAnon = function (x, y) {
  return x + y;
}

// These forms will only be used for short, simple functions.
const addShort = (x, y) => x + y;
const add1Short = (x) => x + 1;
const add1NoParens = x => x + 1;

// This form will not be used in the class.
const addMultiShort = ((x, y) => {
  return x + y;
});


// Calling functions

// Standard method
addStandard(2, 3);

// The first argument in both `apply` and `call` is the value that will be used
// as the context value (`this`) within the function. I will always use null,
// because I never use `this` inside functions.
//
// Functions have methods in JavaScript, which means they can be modified in
// certain ways before they're called.
addStandard.apply(null, [1, 2]);
addStandard.call(null, 1, 2);


// Other stuff

// `arguments` is a value that's passed implicitly into all functions when
// they are called. I will use this occasionally to pipe arguments from one
// function into another. This will be covered in the course. The value itself
// is quirky, and should be used cautiously.
function someFunc(a, b) {
  console.log(arguments);
}

someFunc(1, 2); // logs { '0': 1, '1': 2 }


// IIFE: Immediately Invoked Function Evaluation

// These are a quirk of JavaScript used primarily in the construction of
// closures (which we'll go over in the course). This is what one looks like:
const five = (function () {
  console.log("I'm executing!");
  return 5;
}());

// five now equals 5

// The key thing to note about these strange things is that they're nothing
// more than the definition of a function followed by an immediate call to the
// function. The function itself is then discarded and its return value is all
// that is left. The reasons one might use this may seem mystifying, but
// concrete uses will be provided in the course!
