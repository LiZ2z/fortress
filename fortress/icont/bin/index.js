#!/usr/bin/env node

const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const config = require(path.resolve(process.cwd(), 'icont.config.js'));

require('../src/index')(config);
