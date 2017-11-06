## Create NodeJs context

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/node-context.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/node-context.svg?branch=master)](https://travis-ci.org/axetroy/node-context)
[![Coverage Status](https://coveralls.io/repos/github/axetroy/node-context/badge.svg?branch=master)](https://coveralls.io/github/axetroy/node-context?branch=master)
[![Dependency](https://david-dm.org/axetroy/node-context.svg)](https://david-dm.org/axetroy/node-context)
![License](https://img.shields.io/badge/license-Apache-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=7.6-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/@axetroy/context.svg)](https://badge.fury.io/js/@axetroy/context)

## Usage

```js
const vm = require('vm');
const createContext = require('@axetroy/context');

const context = createContext('./index.js');
const script = new vm.Script(`
const path = require('path');
console.log('current file is: ', __filename); // current/work/dir/index.js
console.log('current work dir:: ', process.cwd());  // current/work/dir
`);

script.runInContext(context);
```

## Contributing

[Contributing Guid](https://github.com/axetroy/node-context/blob/master/CONTRIBUTING.md)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/9758711?v=3" width="100px;"/><br /><sub>Axetroy</sub>](http://axetroy.github.io)<br />[💻](https://github.com/axetroyanti-redirect/anti-redirect/commits?author=axetroy) [🐛](https://github.com/axetroyanti-redirect/anti-redirect/issues?q=author%3Aaxetroy) 🎨 |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxetroy%2Fnode-context.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxetroy%2Fnode-context?ref=badge_large)