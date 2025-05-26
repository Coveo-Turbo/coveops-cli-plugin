import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import {join} from 'node:path'

describe('org:commerce:listings:global:update', () => {
  it('updates the global listing configuration', async () => {
    const configPath = join(__dirname, '../../../../../../fixtures/global-listing-config.json')
    const {stdout} = await runCommand(['org:commerce:listings:global:update',
      '--catalogId', 'default',
      '--configFile', configPath,
    ])
    expect(stdout).to.include('Global listing configuration updated successfully')
  })
})