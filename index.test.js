import test from 'ava';
const path = require('path');
const vm = require('vm');
const createContext = require('./index');

const testFile = './index.js';

test('context', t => {
  const context = createContext(testFile, { name: 'axetroy', global: {} });
  t.deepEqual(context.name, 'axetroy');
  t.deepEqual(context.global.name, 'axetroy');
  t.deepEqual(context.__filename, path.join(__dirname, 'index.js'));
  t.deepEqual(context.__dirname, __dirname);

  t.true(typeof context.setTimeout === 'function');
  t.true(typeof context.setInterval === 'function');
  t.true(typeof context.setImmediate === 'function');
  t.true(typeof context.clearTimeout === 'function');
  t.true(typeof context.clearInterval === 'function');
  t.true(typeof context.clearImmediate === 'function');
  t.deepEqual(process, context.process);
  t.deepEqual(Buffer, context.Buffer);
  t.deepEqual(console, context.console);
});

test('vm', t => {
  const createContext = require('./index');

  const context = createContext(testFile, {
    t,
    pid: process.pid,
    globalBuffer: Buffer
  });
  const script = new vm.Script(`
const path = require('path');
console.log('current file is: ', __filename); // current/work/dir/index.js
console.log('current work dir:: ', process.cwd());  // current/work/dir

t.true(typeof t.pass === 'function');
t.deepEqual(__dirname, process.cwd());
t.deepEqual(__filename, path.join(process.cwd(), 'index.js'));
t.true(typeof console.log === 'function');
t.deepEqual(process.pid, pid);
t.true(typeof module === 'object');
t.true(typeof exports === 'object');
t.deepEqual(Buffer, globalBuffer);
`);

  script.runInNewContext(context);
  t.pass();
});
