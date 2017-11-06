const path = require('path');

function Context(file, context = {}) {
  if (typeof file !== 'string') {
    throw new Error(`file must be a string!`);
  }
  if (this instanceof Context === false) {
    return new Context(file, context);
  }
  this.process = process;
  this.module = module;
  this.exports = this.module.exports = {};
  this.require = require;
  this.Buffer = Buffer;
  this.console = console;
  this.setTimeout = setTimeout;
  this.setInterval = setInterval;
  this.setImmediate = setImmediate;
  this.clearImmediate = clearImmediate;
  this.clearInterval = clearInterval;
  this.clearTimeout = clearTimeout;

  if (!path.isAbsolute(file)) {
    file = path.join(process.cwd(), file);
  }

  this.__filename = file;
  this.__dirname = path.dirname(file);
  this.add(context);
}

Context.prototype.add = function(context) {
  const type = typeof context;
  if (type !== 'object' || context === null) {
    throw new Error(`Context must be a plain object!`);
  }
  for (let attr in context) {
    if (context.hasOwnProperty(attr)) {
      const value = context[attr];
      if (attr === 'global') {
        if (typeof value === 'object' && value !== null) {
          this.add(value);
        } else {
          // skip
          throw new Error(`global property in context must be a object!`);
        }
      } else {
        this[attr] = value;
      }
    }
  }
  this.global = this;
};

module.exports = Context;
module.exports.Context = Context;
module.exports.default = Context;
