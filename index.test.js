import test from 'ava';
const path = require('path');
const createContext = require('./index');

test('context', t => {
  const context = createContext('./index.js', { name: 'axetroy', global: {} });
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
