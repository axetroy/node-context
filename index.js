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
  for (let attr in context) {
    if (context.hasOwnProperty(attr)) {
      if (attr === 'global') {
        if (typeof context[attr] === 'object') {
          this.add(context[attr]);
        }
      } else {
        this[attr] = context[attr];
      }
    }
  }
  this.global = this;
};

module.exports = Context;
module.exports.Context = Context;
module.exports.default = Context;
