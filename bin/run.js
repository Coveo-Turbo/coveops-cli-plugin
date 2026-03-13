#!/usr/bin/env node

import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)
const oclif = require('@oclif/core')

oclif.run().then(require('@oclif/core/flush')).catch(require('@oclif/core/handle'))
