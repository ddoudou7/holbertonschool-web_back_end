import divideFunction from './8-try.js';

console.log(divideFunction(10, 2));

try {
  console.log(divideFunction(10, 0));
} catch (err) {
  console.log(`Error: ${err.message}`);
}
