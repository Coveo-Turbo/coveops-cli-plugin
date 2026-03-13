#!/usr/bin/env node

import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.NODE_ENV = 'development'
process.env.TS_NODE_PROJECT = path.resolve(path.join(__dirname, '..', 'tsconfig.json'))

require('ts-node').register({
  project: process.env.TS_NODE_PROJECT,
  transpileOnly: true,
})

const oclif = require('@oclif/core')

oclif.settings.debug = true
oclif.run().then(oclif.flush).catch(oclif.Errors.handle)
