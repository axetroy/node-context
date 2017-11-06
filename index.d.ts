/// <reference types="node" />

import { Buffer } from 'buffer';
import { Process } from 'process';
import Console from 'console';

interface ContextOptions$ {
  [key: string]: any;
}

interface Context {
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
  global: any;
}

declare function createContext(file: string, context?: ContextOptions$): Context;

export default createContext;
export { createContext };
