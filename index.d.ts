/// <reference types="node" />

import { Buffer } from 'buffer';
import { Process } from 'process';
import Console from 'console';

interface ContextOptions$ {
  [key: string]: any;
}

interface Context$ {
  __filename: string;
  __dirname: string;
  process: Process;
  module: NodeJS.Module;
  exports: any;
  require: any;
  console: Console;
  setTimeout: any;
  setInterval: any;
  setImmediate: any;
  clearImmediate: any;
  clearInterval: any;
  clearTimeout: any;
  Buffer: Buffer;
  global: Context$;
  add(context: ContextConstructor): void;
}

interface ContextConstructor {
  new (filePath: string, context: ContextOptions$): Context$;
}

const Context: ContextConstructor;

export default Context;
export { Context };
