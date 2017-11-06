import test from 'ava';
const path = require('path');
const vm = require('vm');
const Context = require('./index');

const testFile = './index.js';

test('context', t => {
  const context = new Context(testFile, { name: 'axetroy', global: {} });
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
  t.true(typeof context.require === 'function');
  t.deepEqual(context.exports, {});
  t.deepEqual(context.module.exports, context.exports);
  t.deepEqual(process, context.process);
  t.deepEqual(Buffer, context.Buffer);
  t.deepEqual(console, context.console);
});

test('vm', t => {
  const context = new Context(testFile, {
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

test('global var', t => {
  const context = new Context(testFile, {
    t,
    name: 'axetroy',
    global: { lover: 'ice snow' }
  });
  const script = new vm.Script(`
t.deepEqual(name, "axetroy");
t.deepEqual(global.name, "axetroy");
t.deepEqual(lover, "ice snow");
t.deepEqual(global.lover, "ice snow");
`);

  t.deepEqual(context.global, context);
  t.deepEqual(context.global.name, 'axetroy');
  t.deepEqual(context.global.lover, 'ice snow');

  script.runInNewContext(context);
  t.pass();
});

test('invalid file input', t => {
  t.throws(() => {
    new Context(null);
  });
});

test('instance of Context', t => {
  const context1 = new Context(testFile);
  const context2 = Context(testFile);
  t.true(context1 instanceof Context);
  t.true(context2 instanceof Context);
});

test('.add', t => {
  const context = new Context(testFile, {
    t,
    name: 'axetroy'
  });
  const script = new vm.Script(`
t.deepEqual(name, "axetroy");
`);

  script.runInNewContext(context);

  t.deepEqual(context.lover, void 0);

  context.add({ lover: 'ice snow' });

  t.deepEqual(context.lover, 'ice snow');

  t.throws(() => {
    context.add(null);
  });
});
