const path = require('path');

function createContext(file) {
  if (typeof file !== 'string') {
    throw new Error(`file must be a string!`);
  }

  const context = {
    __filename: null,
    __dirname: null,
    process,
    module,
    exports,
    require,
    console,
    setTimeout,
    setInterval,
    setImmediate,
    clearImmediate,
    clearInterval,
    clearTimeout,
    Buffer
  };

  context.global = context;

  if (!path.isAbsolute(file)) {
    file = path.join(process.cwd(), file);
  }

  context.__filename = file;
  context.__dirname = path.dirname(file);

  return context;
}

module.exports = createContext;
module.exports.createContext = createContext;
module.exports.default = createContext;
