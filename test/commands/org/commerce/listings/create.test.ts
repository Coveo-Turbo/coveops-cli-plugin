import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import {join} from 'node:path'

describe('org:commerce:listings:create', () => {
  it('creates a listing configuration with basic parameters', async () => {
    const {stdout} = await runCommand(['org:commerce:listings:create',
      '--name', 'electronics',
      '--displayName', 'Electronics',
      '--filter', '@category==electronics',
      '--catalogId', 'default',
    ])
    expect(stdout).to.contain('Listing configuration "electronics" created successfully')
  })

  it('creates a listing configuration from config file', async () => {
    const configPath = join(__dirname, '../../../../../fixtures/listing-config.json')
    const {stdout} = await runCommand(['org:commerce:listings:create',
      '--name', 'electronics',
      '--displayName', 'Electronics',
      '--filter', '@category==electronics',
      '--catalogId', 'default',
      '--configFile', configPath,
    ])
    expect(stdout).to.contain('Listing configuration "electronics" created successfully')
  })
})